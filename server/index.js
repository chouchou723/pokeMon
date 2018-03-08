const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const serve = require('koa-static')
const axios = require('axios')
const fs = require("fs")
const cors = require('kcors')
const cheerio = require('cheerio')
const qs = require('qs')

const app = new Koa()
const router = new Router({
  // prefix: '/api'
})

app
  .use(serve('.'))
  .use(serve(__dirname+'/Portfolio-page'))
  .use(serve(__dirname+'/Portfolio-page/build'))
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

axios.defaults.url = 'http://www.pokemon.jp/zukan/scripts/data/top_zukan.json'
// axios.defaults.proxy ={
//   host: '127.0.0.1',
//   port: 1080
// }

const fetch_top_zukan = axios.create({
  method: 'get',
});
const DL_top_zukan = axios.create({
  method: 'get',
  responseType: 'stream'
});
const pokemon_wiki = axios.create({
  method: 'get',
});


const jsonPath = `${__dirname}/top_zukan.json`
console.log('zukan_no检查中')
const file = JSON.parse(fs.readFileSync(jsonPath))

if (fs.existsSync(jsonPath)) {
  fetch_top_zukan()
    .then(res => {
      let json = res.data
      if (json.length === file.length) {
        return console.log('zukan_no已最新')
      }
      DL_top_zukan()
        .then(res => {
          console.log('zukan_no需要更新')
          res.data.pipe(fs.createWriteStream(jsonPath))
          console.log("zukan_no更新完成。")
        })
    })
    .catch(function(error) {
      console.log(error);
    });
} else {
  DL_top_zukan()
    .then(res => {
      console.log('没有zukan_no，下载中')
      res.data.pipe(fs.createWriteStream(jsonPath))
      console.log("zukan_no下载完成。")
    })
}

router.get('/',(ctx, next) => {
    // ctx.type = 'application/json';
  // ctx.body = await 'aa';
 ctx.type = 'html';
  ctx.body = fs.createReadStream('./Portfolio-page/chouchou.html');
});

router.get('/pokemon',(ctx, next) => {
    // ctx.type = 'application/json';
  // ctx.body = await 'aa';
 ctx.type = 'html';
  ctx.body = fs.createReadStream('./Portfolio-page/build/index.html');
});

router.get('/top_zukan', async(ctx, next) => {
  ctx.type = 'application/json';
  ctx.body = await file;
})

router.get('/api/detail/:link', async(ctx, next) => {
  let link = ctx.params.link
  const getDetail = (link) => new Promise((resolve, reject) => axios.get(`http://www.pokemon.jp/zukan/detail/${link}`)
    .then(res => {
      const $ = cheerio.load(res.data)
      resolve({
        num: $('.title .num').text(),
        name: $('.title .name').text(),
        profilePhoto: $('.profile-phto img').attr('src'),
        type: $('.type .pokemon-type li a span').map((i, el) => $(el).text().replace(' ','')).get().join(','),
        weaknesses: $('.weaknesses .pokemon-type li a').map((i, el) => $(el).text().replace(/\s/gi,'')).get().join(','),
        details: [
          $('.pokemon-details').find('.details').eq(0).find('li').eq(0).find('p').eq(1).text(),
          $('.pokemon-details').find('.details').eq(0).find('li').eq(1).find('.txts').eq(0).find('p').text(),
          $('.pokemon-details').find('.details').eq(1).find('li').eq(0).find('p').eq(1).text(),
          $('.pokemon-details').find('.details').eq(1).find('li').eq(1).find('p').eq(1).text(),
          $('.pokemon-details').find('.details').eq(1).find('li').eq(2).find('.sex span').map((i, el) => $(el).attr('class')).get().join(','),
        ],
        pokemonForm: $('.pokemon-form .list').children('li').map((i, el) => {
          return {
            link: $(el).children('a').attr('href').replace('/zukan/detail/', ''),
            img: $(el).find('img').attr('src'),
            num: $(el).find('.num').text(),
            name: $(el).find('.name').text(),
            type: $(el).find('.pokemon-type>li').find('p').map((i, el) => $(el).text().replace(' ','')).get().join(','),
          }
        }).get(),
        evolution: $('.evolution>.list').children('li').map((i, el) => {
          if ($(el).attr('class')==="row") return
          return {
            link: $(el).children('a').attr('href').replace('/zukan/detail/', ''),
            img: $(el).find('img').attr('src'),
            num: $(el).find('.num').text(),
            name: $(el).find('.name').text(),
            type: $(el).find('.pokemon-type>li').find('p').map((i, el) => $(el).text().replace(' ','')).get().join(','),
          }
        }).get(),
        evolution_branch:$('.evolution>.list>.row>.list').children('li').map((i, el) => {
          return {
            link: $(el).children('a').attr('href').replace('/zukan/detail/', ''),
            img: $(el).find('img').attr('src'),
            num: $(el).find('.num').text(),
            name: $(el).find('.name').text(),
            type: $(el).find('.pokemon-type>li').find('p').map((i, el) => $(el).text().replace(' ','')).get().join(','),
          }
        }).get(),
        prev: $('.pokemon-page>div').hasClass('prev')?$('.pokemon-page>.prev>a').attr('href').replace('/zukan/detail/', ''):null,
        next: $('.pokemon-page>div').hasClass('next')?$('.pokemon-page>.next>a').attr('href').replace('/zukan/detail/', ''):null
      })
    })
    .catch(err => reject(err))
  )
  ctx.type = 'application/json';
  ctx.body = await getDetail(link)
})

router.post('/api/search/:p', async(ctx, next) => {
  let p = parseInt(ctx.params.p)
  let search = ctx.request.body.search
  let result_file = file.filter(x => {
    return x.zukan_no.indexOf(search) >= 0 ||
      x.pokemon_name.indexOf(search) >= 0
  })
  let lastPage = Math.ceil(result_file.length / 12)
  let arr = []
  for (var id = (0 + p) * 12; id < (1 + p) * 12; id++) {
    await axios.post('http://www.pokemon.jp/api.php', qs.stringify(result_file[id]))
      .then(json => {
        if (json.data.name != null) arr.push(json.data)
      })
      .catch(err => err)
  }

  ctx.type = 'application/json';
  ctx.body = {
    data: arr,
    noPage: (p + 1 === lastPage) ? true : false
  }
})

router.post('/api/random', async(ctx, next) => {
  let random = ctx.request.body.random
  let arr
  await axios.post('http://www.pokemon.jp/api.php', qs.stringify(random))
    .then(json => arr=json.data)
    .catch(err => err)
  ctx.type = 'application/json';
  ctx.body =  arr
})


router.post('/api/filter/:p',
  async(ctx, next) => {
    let type = (ctx.request.body.tag.type.length>0) ? ctx.request.body.tag.type.map(x=>x.tag) : ctx.request.body.tag.type
    if (type.length === 1) {
      ctx.result_1 = file.filter(x => x.type.indexOf(type[0]) >= 0)
    }
    else if(type.length === 2){
      ctx.result_1 = file.filter(x => x.type.indexOf(type[0]) >= 0 && x.type.indexOf(type[1]) >= 0)
    }
    else {
      ctx.result_1 = file
    }
    await next()
  },
  async(ctx, next) => {
    let tokusei = ctx.request.body.tag.feature
    if (tokusei===null) {
      ctx.result_2 = ctx.result_1
    } else {
      ctx.result_2 = ctx.result_1.filter(x => x.tokusei.includes(tokusei))
    }
    await next()
  },
  async(ctx, next) => {
    let takasa = (ctx.request.body.tag.height.length>0) ? ctx.request.body.tag.height.map(x=>x.tag) : ctx.request.body.tag.height
    let low = 0,
      normal = 1.1,
      high = 2.1

    if (takasa.length>0) {
      let array = []
      for(let i=0;i<takasa.length;i++){
        ctx.result_2.forEach((elm) => {
          if(takasa[i]==='low' && elm.takasa >= low && elm.takasa < normal){
            array.push(elm)
          }else if (takasa[i]==='normal' && elm.takasa < high && elm.takasa >= normal) {
            array.push(elm)
          }else if (takasa[i]==='high' && elm.takasa >= high) {
            array.push(elm)
          }
        })
      }
      array.sort(function(a, b) {
        a = parseInt(a.zukan_no, 10);
        b = parseInt(b.zukan_no, 10);
        return a - b;
      })
      ctx.result_3 = array
    } else {
      ctx.result_3 = ctx.result_2
    }
    await next()
  },
  async(ctx, next) => {
    let omosa = (ctx.request.body.tag.weight.length>0) ? ctx.request.body.tag.weight.map(x=>x.tag) : ctx.request.body.tag.weight
    let light = 0,
      normal = 35.1,
      heavy = 100
    if (omosa.length>0) {
      let array = []
      for(let i=0;i<omosa.length;i++){
        ctx.result_3.forEach((elm) => {
          if(omosa[i]==='light' && elm.omosa >= light && elm.omosa < normal){
            array.push(elm)
          }else if (omosa[i]==='normal' && elm.omosa < heavy && elm.omosa >= normal) {
            array.push(elm)
          }else if (omosa[i]==='heavy' && elm.omosa >= heavy) {
            array.push(elm)
          }
        })
      }
      array.sort(function(a, b) {
        a = parseInt(a.zukan_no, 10);
        b = parseInt(b.zukan_no, 10);
        return a - b;
      })
      ctx.result_4 = array
    } else {
      ctx.result_4 = ctx.result_3
    }
    await next()
  },
  async(ctx, next) => {
    let p = parseInt(ctx.params.p)
    let region = (ctx.request.body.tag.region.length>0) ? ctx.request.body.tag.region.map(x=>x.tag) : ctx.request.body.tag.region
    if (region.length>0) {
      let array = []
      for(let i=0;i<region.length;i++){
        ctx.result_4.forEach((elm) => {
          let zukanNum = parseInt(elm.zukan_no, 10)
          if(region[i]==='kanto' && zukanNum >= 1 && zukanNum <= 151){
            array.push(elm)
          }else if (region[i]==='jhoto' && zukanNum >= 152 && zukanNum <= 251) {
            array.push(elm)
          }else if (region[i]==='hoenn' && zukanNum >= 252 && zukanNum <= 386) {
            array.push(elm)
          }else if (region[i]==='sinnoh' && zukanNum >= 387 && zukanNum <= 493) {
            array.push(elm)
          }else if (region[i]==='isshu' && zukanNum >= 494 && zukanNum <= 649) {
            array.push(elm)
          }else if (region[i]==='kalos' && zukanNum >= 650 && zukanNum <= 721) {
            array.push(elm)
          }else if (region[i]==='arolla' && zukanNum >= 722 && zukanNum <= 801) {
            array.push(elm)
          }
        })
      }
      array.sort(function(a, b) {
        a = parseInt(a.zukan_no, 10);
        b = parseInt(b.zukan_no, 10);
        return a - b;
      })
      ctx.result_5 = array
    } else {
      ctx.result_5 = ctx.result_4
    }

    let lastPage = Math.ceil(ctx.result_5.length/12)
    let arr = []
    for (var id = (0+p)*12; id < (1+p)*12; id++){
      await axios.post('http://www.pokemon.jp/api.php', qs.stringify(ctx.result_5[id]))
      .then(json => {if(json.data.name!=null) arr.push(json.data)})
      .catch(err => err)
    }
    ctx.type = 'application/json';
    ctx.body = {
      data:arr,
      noPage:(p + 1 === lastPage) ? true : false
    }
  })

router.get('/api/init/:p', async(ctx, next) => {
  let p = parseInt(ctx.params.p)
  let lastPage = Math.ceil(file.length / 12)
  let arr = []
  for (var id = (0 + p) * 12; id < (1 + p) * 12; id++) {
    await axios.post('http://www.pokemon.jp/api.php', qs.stringify(file[id]))
      .then(json => {
        if (json.data.name != null) arr.push(json.data)
      })
      .catch(err => console.log(err))
  }
  ctx.type = 'application/json';
  ctx.body = {
    data: arr,
    noPage: (p + 1 === lastPage) ? true : false
  }
})


app.listen(3000);
console.log('app started at port 3000...');

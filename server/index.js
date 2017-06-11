const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const axios = require('axios')
const fs = require("fs")
const cors = require('kcors')
const cheerio = require('cheerio')
const qs = require('qs')

const app = new Koa()
const router = new Router({
  prefix: '/api'
})

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

axios.defaults.url = 'http://www.pokemon.jp/zukan/scripts/data/top_zukan.json'
/*axios.defaults.proxy = {
  host: '10.220.2.48',
  port: 8080
}*/
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

router.get('/top_zukan', async(ctx, next) => {
  ctx.type = 'application/json';
  ctx.body = await file;
})

router.post('/detail', async(ctx, next) => {
  let link = ctx.request.body.link
  const getDetail = (link) => new Promise((resolve, reject) => axios.get(`http://www.pokemon.jp/zukan/detail/${link}`)
    .then(res => {
      const $ = cheerio.load(res.data)
      resolve({
        num: $('.title .num').text(),
        name: $('.title .name').text(),
        profilePhoto: $('.profile-phto img').attr('src'),
        type: $('.type .pokemon-type li a span').map((i, el) => $(el).text()).get().join(','),
        weaknesses: $('.weaknesses .pokemon-type li a span').map((i, el) => $(el).text()).get().join(','),
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
            name: $(el).find('.name').text()
          }
        }).get(),
        evolution: $('.evolution .list').children('li').map((i, el) => {
          return {
            link: $(el).children('a').attr('href').replace('/zukan/detail/', ''),
            img: $(el).find('img').attr('src'),
            num: $(el).find('.num').text(),
            name: $(el).find('.name').text()
          }
        }).get()
      })
    })
    .catch(err => reject(err))
  )
  ctx.type = 'application/json';
  ctx.body = await getDetail(link)
})

router.post('/search/:p', async(ctx, next) => {
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

router.post('/random', async(ctx, next) => {
  let random = ctx.request.body.random
  let arr
  await axios.post('http://www.pokemon.jp/api.php', qs.stringify(random))
    .then(json => arr=json.data)
    .catch(err => err)
  ctx.type = 'application/json';
  ctx.body =  arr
})

router.post('/filter/:id',
  async(ctx, next) => {
    let type = ctx.request.body.type
    if (type) {
      ctx.result_1 = file.filter(x => x.type.indexOf(type) >= 0)
    } else {
      ctx.result_1 = file
    }
    await next()
  },
  async(ctx, next) => {
    let tokusei = ctx.request.body.tokusei
    if (tokusei) {
      ctx.result_2 = ctx.result_1.filter(x => x.tokusei === tokusei)
    } else {
      ctx.result_2 = ctx.result_1
    }
    await next()
  },
  async(ctx, next) => {
    let takasa = ctx.request.body.takasa
    let low = 0,
      normal = 1.1,
      high = 2.1
    if (takasa) {
      ctx.result_3 = ctx.result_2.filter(x => {
        switch (takasa) {
        case 'low':
          return x.takasa >= low && x.takasa < normal
        case 'normal':
          return x.takasa < high && x.takasa >= normal
        case 'high':
          return x.takasa >= high
        }
      })
    } else {
      ctx.result_3 = ctx.result_2
    }
    await next()
  },
  async(ctx, next) => {
    let omosa = ctx.request.body.omosa
    let light = 0,
      normal = 35.1,
      heavy = 100
    if (omosa) {
      ctx.result_4 = ctx.result_3.filter(x => {
        switch (omosa) {
        case 'light':
          return x.omosa >= light && x.omosa < normal
        case 'normal':
          return x.omosa < heavy && x.omosa >= normal
        case 'heavy':
          return x.omosa >= heavy
        }
      })
    } else {
      ctx.result_4 = ctx.result_3
    }
    await next()
  },
  async(ctx, next) => {
    let id = ctx.params.id
    let regionSearch = ctx.request.body.regionSearch
    if (regionSearch) {
      ctx.result_5 = ctx.result_4.filter(x => {
        let zukanNum = parseInt(x.zukan_no, 10)
        switch (regionSearch) {
        case 'kanto':
          return zukanNum >= 1 && zukanNum <= 151
        case 'jhoto':
          return zukanNum >= 152 && zukanNum <= 251
        case 'hoenn':
          return zukanNum >= 252 && zukanNum <= 386
        case 'sinnoh':
          return zukanNum >= 387 && zukanNum <= 493
        case 'isshu':
          return zukanNum >= 494 && zukanNum <= 649
        case 'kalos':
          return zukanNum >= 650 && zukanNum <= 721
        case 'arolla':
          return zukanNum >= 722 && zukanNum <= 801
        }
      })
    } else {
      ctx.result_5 = ctx.result_4
    }
    const getFilter = (id) => new Promise((resolve, reject) => axios.post('http://www.pokemon.jp/api.php', qs.stringify(ctx.result_5[id]))
      .then(json => resolve(json.data))
      .catch(err => reject(err))
    )
    ctx.type = 'application/json';
    ctx.body = await getFilter(id)
  })

router.get('/init/:p', async(ctx, next) => {
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

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const axios = require('axios')
const fs = require("fs")
const cors = require('kcors')
const app = new Koa()
const router = new Router()
const cheerio = require('cheerio')
const qs = require('qs')

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

axios.defaults.url = 'http://www.pokemon.jp/zukan/scripts/data/top_zukan.json'


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

if (fs.existsSync(jsonPath)) {
  fetch_top_zukan()
    .then(res => {
      let json = res.data
      const file = JSON.parse(fs.readFileSync(jsonPath))
      if (json[json.length - 1].zukan_no === file[file.length - 1].zukan_no) {
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


router.post('/api/detail',async (ctx, next) => {
  let link = ctx.request.body.link
  const getDetail = (link) => new Promise((resolve, reject) => 
    axios.get(`http://www.pokemon.jp/zukan/detail/${link}`)
    .then(res => {
      const $ = cheerio.load(res.data)
      resolve({name:$('.name').eq(0).text()})
    })
    .catch(err => reject(err))
  )
  ctx.type = 'application/json';
  ctx.body = await getDetail(link)
})

router.post('/api/searc/:id',async (ctx, next) => {
  let search = ctx.request.body.search
  const file = JSON.parse(fs.readFileSync(jsonPath))
  let result_file = file.filter((x) => {
    return x.zukan_no.indexOf(search)>=0 || x.pokemon_name.indexOf(search)>=0
  });
  let id = ctx.params.id;
  const getSearch = (id) => new Promise((resolve, reject) => 
      axios.post('http://www.pokemon.jp/api.php',qs.stringify(result_file[id]))
        .then(json => resolve(json.data))
        .catch(err => reject(err))
  )
  ctx.type = 'application/json';
  ctx.body = await getSearch(id)
})

router.get('/api/:id',async (ctx, next) => {
  const file = JSON.parse(fs.readFileSync(jsonPath))
  let id = ctx.params.id;
  const getApi = (id) => new Promise((resolve, reject) => 
    axios.post('http://www.pokemon.jp/api.php',qs.stringify(file[id]))
    .then(json => resolve(json.data))
    .catch(err => reject(err))
  )
  ctx.type = 'application/json';
  ctx.body = await getApi(id)
})

app.listen(3000);
console.log('app started at port 3000...');

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const rp = require('request-promise')
const fs = require("fs")
const app = new Koa();
const router = new Router();
const request = rp.defaults({'proxy':'http://localhost'})

app
.use(bodyParser())
.use(router.routes())
.use(router.allowedMethods())


const options = {
  uri: 'http://www.pokemon.jp/api.php',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; rv:51.0) Gecko/20100101 Firefox/51.0'
  },
  json: true 
};
const topZukan = {'uri':'http://www.pokemon.jp/zukan/scripts/data/top_zukan.json'}

const jsonPath= `${__dirname}/top_zukan.json`
const file = require(jsonPath)

console.log('zukan_no检查中')
if(fs.existsSync(jsonPath)){
  request(Object.assign({}, options, topZukan))
    .then((json) => {
      if(json[json.length-1].zukan_no === file[file.length-1].zukan_no){
        console.log('zukan_no已最新')
      }else{
        console.log('zukan_no需要更新，下载中')
        request(Object.assign({}, options, topZukan))
          .pipe(fs.createWriteStream(jsonPath))
         console.log("zukan_no下载完成。");
      }
    }).catch((err) => {
      console.log(err)
    })
}else{
  console.log('没有zukan_no，下载中')
  request(Object.assign({}, options, topZukan))
    .pipe(fs.createWriteStream(jsonPath))
  console.log("zukan_no下载完成。");
}



router.post('/api',async (ctx, next) => {
  let id = ctx.request.body.id;
  const getApi = (id) => new Promise((resolve, reject) => 
    request(Object.assign({}, options, {method: 'POST',form:file[id]}))
    .then((json) => resolve(json))
    .catch((err) => reject(err))
  )
  ctx.type = 'application/json';
  ctx.body = await getApi(id)
});

app.listen(3000);
console.log('app started at port 3000...'); 
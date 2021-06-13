const Koa = require('koa')

// 本次 http 请求的实例
const app = new Koa()

app.use(async (ctx, next) => {
  console.log('11 请求开始...', ctx.method, ctx.url)
  await next()
  ctx.response.body = '111111'
  console.log('11 after next')
})
app.use(async (ctx, next) => {
  console.log('22 处理 /api 路由')
  await new Promise(resolve => {
    setTimeout(() => {
      resolve('ok')
    }, 1000)
  })
  await next()
  console.log('22 after next')
})

app.use(async (ctx, next) => {
  // 假设在处理 cookie
  console.log('33 处理 cookie...')
  // req.cookie = {
  //   userId: 'abc123',
  // }
  await next()
  console.log('33 after next')
})

// 模拟登录验证
function loginCheck(req, res, next) {
  console.log('44 模拟登录')
  next()
  console.log('44 after next')
}

app.use(async (ctx, next) => {
  console.log('55 get /api/get-cookie...')
  ctx.response.body = '22222'
  await next()
  console.log('55 after next')
})

app.listen(8000, () => {
  console.log('server is running on port 8000')
})

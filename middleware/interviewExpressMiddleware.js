const http = require('http')
class Express {
  constructor() {
    this.stack = []
  }
  use(cb) {
    this.stack.push(cb)
  }
  handle(req, res) {
    const next = () => {
      const middleware = this.stack.shift()
      if (middleware) {
        middleware(req, res, next)
      }
    }
    return next()
  }
  callback() {
    return (req, res) => {
      this.handle(req, res)
    }
  }
  listen(...args) {
    const server = http.createServer(this.callback())
    // 参数透传到httpServer里
    server.listen(...args)
  }
}

// const express = require('./likeExpressMiddleware')
// const express = require('express')

// 本次 http 请求的实例
const app = new Express()

app.use((req, res, next) => {
  console.log('11 请求开始...', req.method, req.url)
  next()
  console.log('11 after next')
})
// app.use('/api', (req, res, next) => {
//   console.log('22 处理 /api 路由')
//   next()
//   console.log('22 after next')
// })

app.use((req, res, next) => {
  // 假设在处理 cookie
  console.log('33 处理 cookie...')
  req.cookie = {
    userId: 'abc123',
  }

  next()
  console.log('33 after next')
})

// app.get('/api', (req, res, next) => {
//   console.log('44 处理 get /api 路由')
//   next()
//   console.log('44 after next')
// })

// app.post('/api', (req, res, next) => {
//   console.log('处理 post /api 路由')
//   next()
// })

// // 模拟登录验证
// function loginCheck(req, res, next) {
//   console.log('55 模拟登录')
//   next()
//   console.log('55 after next')
// }

// app.get('/api/get-cookie', loginCheck, (req, res, next) => {
//   console.log('66 get /api/get-cookie...')
//   res.json({
//     errno: 0,
//     data: req.cookie,
//   })
//   console.log('66 after next')
// })

// app.use((req, res, next) => {
//   console.log('处理 404')
//   res.json({
//     errno: -1,
//     msg: '404 not found',
//   })
// })

app.listen(8000, () => {
  console.log('server is running on port 8000')
})

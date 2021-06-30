const http = require('http')
// class Express {
//   constructor() {
//     this.stack = []
//   }
//   use(cb) {
//     this.stack.push(cb)
//   }
//   handle(req, res) {
//     const next = () => {
//       const middleware = this.stack.shift()
//       if (middleware) {
//         middleware(req, res, next)
//       }
//     }
//     return next()
//   }
//   callback() {
//     return (req, res) => {
//       this.handle(req, res)
//     }
//   }
//   listen(...args) {
//     const server = http.createServer(this.callback())
//     // 参数透传到httpServer里
//     server.listen(...args)
//   }
// }

// const express = require('./likeExpressMiddleware')
// const express = require('express')

class Express {
  constructor() {
    this.stack = []
  }
  use(handle) {
    this.stack.push(handle)
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
    server.listen(...args)
  }
}
// 本次 http 请求的实例
const app = new Express()

app.use((req, res, next) => {
  console.log('11 请求开始...', req.method, req.url)
  next()
  console.log('11 after next')
})

app.use((req, res, next) => {
  // 假设在处理 cookie
  console.log('33 处理 cookie...')
  req.cookie = {
    userId: 'abc123',
  }
  next()
  console.log('33 after next')
})

app.listen(8000, () => {
  console.log('server is running on port 8000')
})

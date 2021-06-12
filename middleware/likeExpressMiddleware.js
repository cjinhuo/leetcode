const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
  constructor() {
    this.routes = []
  }

  register(path) {
    const info = {}
    if (typeof path === 'string') {
      info.path = path
      // 从第二个参数开始，转换为数组，存入stack
      info.stack = slice.call(arguments, 1)
    } else {
      info.path = '/'
      info.stack = slice.call(arguments, 0)
    }
    return info
  }

  use() {
    const info = this.register.apply(this, arguments)
    info.method = 'all'
    this.routes.push(info)
  }

  get() {
    const info = this.register.apply(this, arguments)
    info.method = 'get'
    this.routes.push(info)
  }

  post() {
    const info = this.register.apply(this, arguments)
    info.method = 'post'
    this.routes.push(info)
  }

  match(method, url) {
    let stack = []
    // 可有可无
    if (url === '/favicon.ico') {
      return stack
    }
    stack = this.routes
      .filter(route => {
        return ~url.indexOf(route.path) && (route.method === method || route.method === 'all')
      })
      .reduce((result, item) => {
        result = result.concat(item.stack)
        return result
      }, [])
    return stack
  }

  handle(req, res, stack) {
    const next = () => {
      const middleware = stack.shift()
      if (middleware) {
        debugger
        middleware(req, res, next)
      }
    }
    next()
  }

  // httpServer的回调函数
  callback() {
    return (req, res) => {
      res.json = data => {
        res.setHeader('content-type', 'application/json')
        res.end(JSON.stringify(data))
      }
      const url = req.url
      const method = req.method.toLowerCase()
      const resultList = this.match(method, url)
      this.handle(req, res, resultList)
    }
  }
  listen(...args) {
    const server = http.createServer(this.callback())
    // 参数透传到httpServer里
    server.listen(...args)
  }
}

module.exports = () => {
  return new LikeExpress()
}

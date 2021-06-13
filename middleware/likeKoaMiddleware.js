const http = require('http')

function compose(middleware) {
  // if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  // for (const fn of middleware) {
  //   if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  // }
  return function (context, next) {
    let index = -1
    return dispatch(0)
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      // if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
}

class LikeKoa {
  constructor() {
    this.middleware = []
  }

  use(fn) {
    // fn只能是一个函数，参数是ctx next
    this.middleware.push(fn)
    return this
  }

  createContext(req, res) {
    const context = Object.create(this.context)
  }

  handle(req, res, stack) {
    const next = async () => {
      const middleware = stack.shift()
      if (middleware) {
        return middleware(req, res, next)
      }
    }
    next()
  }

  // httpServer的回调函数
  callback() {
    const fn = compose(this.middleware)
    // 捕捉错误行为 不写
    const handleRequest = (req, res) => {
      const ctx = {
        req,
        res,
      }
      return this.handleRequest(ctx, fn)
    }
    return handleRequest
  }

  handleRequest(ctx, fnMiddleware) {
    return fnMiddleware(ctx).then(res => console.log('res', res))
  }
  listen(...args) {
    const server = http.createServer(this.callback())
    // 参数透传到httpServer里
    server.listen(...args)
  }
}

module.exports = LikeKoa

const express = require('./likeExpressMiddleware')
// const express = require('express')

// 本次 http 请求的实例
const app = express()

app.use((req, res, next) => {
  console.log('请求开始...', req.method, req.url)
  next()
})
app.use('/api', async (req, res, next) => {
  console.log('处理 /api 路由')
  await Promise.resolve().then(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('ok')
      }, 2000)
    })
  })
  console.log('promsie ok')
  next()
})

app.use((req, res, next) => {
  // 假设在处理 cookie
  console.log('处理 cookie...')
  req.cookie = {
    userId: 'abc123',
  }
  next()
})

app.get('/api', (req, res, next) => {
  console.log('处理 /api 路由')
  next()
})

app.post('/api', (req, res, next) => {
  console.log('处理 /api 路由')
  next()
})

// 模拟登录验证
function loginCheck(req, res, next) {
  console.log('模拟登录')
  next()
  // setTimeout(() => {
  // })
}

app.use('/api/get-cookie', loginCheck, (req, res, next) => {
  console.log('get /api/get-cookie...')
  res.json({
    errno: 0,
    data: req.cookie,
  })
})

app.use((req, res, next) => {
  console.log('处理 404')
  res.json({
    errno: -1,
    msg: '404 not found',
  })
})

app.listen(8000, () => {
  console.log('server is running on port 8000')
})

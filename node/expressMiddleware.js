const app = new express()

app.use((req, res, next) => {
  next()
})

app.use('/api', (req, res, next) => {
  next()
})

app.post('/login', (req, res) => {
  res.json({ result: 1, msg: '我是post请求' })
})

function middleWare(req, res, next) {
  console.log('我是中间件')
  next()
}

app.get('/getContent', middleWare, () => {
  res.json({ result: 1, msg: '我是get请求' })
})

app.listen(8080)

let p = new Promise((resolve, reject) => {
  reject(1)
})

p.then(e => {
  console.log('success', e)
}, e => {
  console.log('error', e)
  throw new Error('1')
}).catch(e => {
  console.log('error', e)
})
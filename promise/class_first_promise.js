class MyPromise {
  constructor(func) {
    this.status = 'pending'
    this.value = undefined // status为resolved时返回的值
    this.reason = undefined // status为rejected时返回的值
    // 用来保存then传进来的函数，当状态改变时调用
    this.onFullfilledArray = []
    this.onRejectedArray = []
    try {
      // 由于resolve、reject都是在类外面执行的，所以需要绑定this
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  //
  reject(error) {
    if (this.status === 'pending') {
      this.status = 'rejected'
      this.reason = error
      this.onRejectedArray.forEach(f => {
        // 执行then传的函数
        f(error)
      })
    }
    console.log('reject', error)
  }

  resolve(value) {
    if (this.status === 'pending') {
      this.status = 'resolved'
      this.value = value
      this.onFullfilledArray.forEach(f => {
        // 执行then传的函数
        f(value)
      })
    }
    console.log('resolved', value)
  }

  // then函数可以传一个或两个函数
  then(onFullfilled, onRejected) {
    let tempPromise,
      self = this
    switch (this.status) {
      case 'pending':
        tempPromise = new MyPromise((resolve, reject) => {
          self.onFullfilledArray.push(function (value) {
            try {
              let temp = onFullfilled(value)
              resolve(temp)
            } catch (error) {
              reject(error)
            }
          })
          self.onRejectedArray.push(function (reason) {
            try {
              let temp = onRejected(reason)
              reject(temp)
            } catch (error) {
              reject(error)
            }
          })
        })
        break
      case 'resolved':
        tempPromise = new MyPromise((resolve, reject) => {
          try {
            let temp = onFullfilled(self.value)
            resolve(temp)
          } catch (error) {
            reject(error)
          }
        })
        break
      case 'rejected':
        tempPromise = new MyPromise((resolve, reject) => {
          try {
            let temp = onRejected(self.reason)
            reject(temp)
          } catch (error) {
            reject(error)
          }
        })

        break
    }
    return tempPromise
  }

  catch(onRejected) {
    let tempPromise,
      self = this
    switch (this.status) {
      case 'pending':
        tempPromise = new MyPromise((resolve, reject) => {
          self.onFullfilledArray.push(function (value) {
            try {
              let temp = onFullfilled(value)
              resolve(temp)
            } catch (error) {
              reject(error)
            }
          })
          self.onRejectedArray.push(function (reason) {
            try {
              let temp = onRejected(reason)
              reject(temp)
            } catch (error) {
              reject(error)
            }
          })
        })
        break
      case 'resolved':
        tempPromise = new MyPromise((resolve, reject) => {
          try {
            let temp = onFullfilled(self.value)
            resolve(temp)
          } catch (error) {
            reject(error)
          }
        })
        break
      case 'rejected':
        tempPromise = new MyPromise((resolve, reject) => {
          try {
            let temp = onRejected(self.reason)
            reject(temp)
          } catch (error) {
            reject(error)
          }
        })
        break
    }
    return tempPromise
  }
}

let myPromise = new MyPromise((resolve, reject) => {
  console.log('请求数据...')
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
  .then(res => {
    console.log('then', res)
  })
  .catch(error => {
    console.log('error', error)
  })
// .then(res => {
//   console.log(typeof res)
//   console.log('第二个then:', res)
//   return 3
// }).catch(error => {
//   console.log('第一个catch', error)
// })

// 输出结果：
// 请求数据...
// 第一个then: 1
// 第二个then: 2
// resolved 3
// resolved 2
// resolved 1

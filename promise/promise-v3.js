// 解决V2的then没有返回Promise的问题
myPromise.prototype.pending = 'pending'
myPromise.prototype.rejected = 'rejected'
myPromise.prototype.resolved = 'resolved'
function myPromise(constructor) {
  let self = this
  self.status = myPromise.prototype.pending // 定义状态改变前的初始状态
  self.value = undefined // 定义状态为resovled时候的状态
  self.reason = undefined // 定义状态为rejected时候的状态
  self.onFullfilledArray = []
  self.onRejectedArray = []
  function resolve(value) {
    // 两个 === “pending” 保证了状态的改变不可逆
    if (self.status === myPromise.prototype.pending) {
      self.value = value
      self.onFullfilledArray.forEach(function (f) {
        f(self.value)
        //如果状态从pending变为resolved，
        //那么就遍历执行里面的异步方法
      })
    }
  }

  function reject(reason) {
    // 两个 === "pending"，保证了状态的改变是不可逆的
    if (self.status === 'pending') {
      self.status = reason
      self.status = 'rejected'
      self.onRejectedArray.forEach(function (f) {
        f(self.reason)
        //如果状态从pending变为rejected，
        //那么就遍历执行里面的异步方法
      })
    }
  }

  try {
    constructor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

myPromise.prototype.then = function (onFullfilled, onRejected) {
  let self = this
  let promise2
  switch (self.status) {
    case 'pending':
      promise2 = new myPromise((resolve, reject) => {
        self.onFullfilledArray.push(function () {
          try {
            let temple = onFullfilled(self.value)
            resolve(temple)
          } catch (e) {
            reject(e) //error catch
          }
        })
        self.onRejectedArray.push(function () {
          try {
            let temple = onRejected(self.reason)
            reject(temple)
          } catch (e) {
            reject(e) // error catch
          }
        })
      })
      break
    case 'resolved':
      onFullfilled(self.value)
      break
    case 'rejected':
      onRejected(self.reason)
      break
    default:
      break
  }
  return promise2
}

// var p1 = new myPromise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('settimeout')
//     resolve(1)
//   }, 1000)
// });
// p1.then(result => {
//   console.log('result', result)
// }).then()

let p = new myPromise((resolve, reject) => {
  debugger
  resolve(1)
})
p.then(result => {
  console.log(result)
  return 2
})
  .then(result => {
    console.log(result)
    // setTimeout(() => {
    //   return 3
    // })
    // console.log(result)
    return new myPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(3)
      }, 1000)
    })
  })
  .then(result => {
    console.log(result)
  })

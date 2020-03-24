// 版本一
function myPromise(constructor){
  let self = this
  self.status = 'pending' // 定义状态改变前的初始状态
  self.value = undefined // 定义状态为resovled时候的状态
  self.reason = undefined // 定义状态为rejected时候的状态
  function resolve(value) {
    console.log('进入resolved')
    // 两个 === “pending” 保证了状态的改变不可逆
    if(self.status === "pending") {
      self.value = value
      self.status = "resolved"
    }
  }

  function reject(reason) {
    // 两个 === "pending"，保证了状态的改变是不可逆的
    if (self.status === 'pending'){
      self.status = reason
      self.status = "rejected"
    }
  }

  try {
    constructor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

myPromise.prototype.then = function(onFullfilled, onRejected){
  let self = this
  switch(self.status) {
    case 'resolved':
      onFullfilled(self.value)
      break;
    case "rejected":
      onRejected(self.reason)
      break;
    default:
      break;
  }
}
// 可以做一些同步操作
// var p = new myPromise((resolve, reject) =>{ 
//     console.log('new promise')
//     resolve(1)
// });
// p.then(result => {
//   console.log('result', result)
// })
// 输出结果：
// new promise
// 进入resolved
// result 1

// 不能做异步操作。
var p2 = new myPromise((resolve, reject) => {
  setTimeout(() => {
    console.log('settimeout')
    resolve(1)
  }, 1000);
});
p2.then(result => {
  console.log('settimeout result', result)
})
// 输出结果：（执行到p2.then的时候，当前的状态并没有改变成resolved，所以执行到default）
// settimeout
// 进入resolved



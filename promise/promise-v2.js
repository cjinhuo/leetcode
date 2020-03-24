// 为了修复版本一不能执行异步的操作，在Promise里面添加两个数组作为调用栈
// 版本二
function myPromise(constructor){
  let self = this
  self.status = 'pending' // 定义状态改变前的初始状态
  self.value = undefined // 定义状态为resovled时候的状态
  self.reason = undefined // 定义状态为rejected时候的状态
  self.onFullfilledArray = []
  self.onRejectedArray = []
  function resolve(value) {
    // 两个 === “pending” 保证了状态的改变不可逆
    if(self.status === "pending") {
      self.value = value
      self.onFullfilledArray.forEach(function (f) {
        f(self.value);
        //如果状态从pending变为resolved，
        //那么就遍历执行里面的异步方法
      });
    }
  }

  function reject(reason) {
    // 两个 === "pending"，保证了状态的改变是不可逆的
    if (self.status === 'pending'){
      self.status = reason
      self.status = "rejected"
      self.onRejectedArray.forEach(function (f) {
        f(self.reason);
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
  let self = this;
  switch (self.status) {
    case "pending":
      self.onFullfilledArray.push(function (value) {
        onFullfilled(value)
      });
      self.onRejectedArray.push(function (reason) {
        onRejected(reason)
      });
      break;
    case "resolved":
      onFullfilled(self.value);
      break;
    case "rejected":
      console.log('rejected')
      onRejected(self.reason);
      break;
    default:
      break;
  }
}

var p1 = new myPromise((resolve, reject) =>{ 
  setTimeout(() => {
    console.log('settimeout')
    resolve(1)
   }, 1000)
});
p1.then(result => {
  console.log('result', result)
})
// 会先执行then =》 把() => console.log()这个函数放入onFullfilledArray里面 
// =》 等下setTimeout执行resolved时会遍历这个数组里面的所有函数
// settimeout
// result 1

// 有个弊端：原生的Promise的then方法是返回一个Promise对象，但是目前是没有做任何处理的。




Function.prototype.myCall = function (context, ...args) {
  if (this === Function.prototype) {
    // 防止Function.prototype.myCall()直接执行
    return undefined
  }
  context = context || window
  // 用这个是为了防止命名冲突，可以用任何key，只要将函数放入该对象中就行
  const fn = Symbol()
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}

// Function.prototype.myApply = function (context, args) {
//   if (this === Function.prototype) {
//     // 防止Function.prototype.myCall()直接执行
//     return undefined
//   }
//   context = context || window
//   const fn = Symbol()
//   context[fn] = this
//   let result = null
//   if (Array.isArray(args)) {
//     result = context[fn](...args)
//   } else {
//     result = context[fn]()
//   }
//   delete context[fn]
//   return result
// }

Function.prototype.myApply = function (context, args) {
  context = context || window
  const s = Symbol()
  context[s] = this
  let result = null
  if (Array.isArray(args)) {
    result = context[s](...args)
  } else {
    result = context[fn]()
  }
  delete context[s]
  return result
}

// Function.prototype.myBind = function (context, ...args1) {
//   if (this === Function.prototype) {
//     throw new TypeError('Error')
//   }
//   const _this = this
//   return function F(...args2) {
//     // 判断是否用于构造函数
//     if (this instanceof F) {
//       return new _this(...args1, ...args2)
//     }
//     return _this.apply(context, args1.concat(args2))
//   }
// }

Function.prototype.myBind = function (context, ...args1) {
  // if (this === Function.prototype) throw new TypeError('Error')
  // const _this = this
  // return function fn(...args2) {
  //   return _this.apply(context, args1.concat(args2))
  // }
  return (...args2) => {
    this.apply(context, args1.concat(args2))
  }
}

let obj = {
  name: '小张',
  age: 18,
  myFun: function (from, to) {
    console.log('名字：' + this.name + '年龄：' + this.age + '来自' + from + '去往' + to)
  },
}
let db = {
  name: '豆豆',
  age: 25,
}
obj.myFun.myCall(db, '成都', '上海')
obj.myFun.myApply(db, ['成都', '上海'])
obj.myFun.myBind(db, '成都', '上海')()
obj.myFun.bind(db, ['成都', '上海'])()

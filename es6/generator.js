function asyncToGenerator(generatorFn) {
  // 将 Generator 函数包装成了一个新的匿名函数，调用这个匿名函数时返回一个 Promise
  return function () {
    // 生成迭代器，相当于执行 Generator 函数
    // 如上面三碗不过岗例子中的 var canteen = webCanteenGenerator()
    var gen = generatorFn.apply(this, arguments)
    return new Promise(function (resolve, reject) {
      // 利用 Generator 分割代码片段，每一个 yield 用 Promise 包裹起来
      // 递归调用 Generator 函数对应的迭代器，当迭代器执行完成时执行当前的 Promise，失败时则拒绝 Promise
      function step(key, arg) {
        try {
          var info = gen[key](arg)
          var value = info.value
        } catch (error) {
          reject(error)
          return
        }

        if (info.done) {
          // 递归终止条件，完成了就 resolve
          resolve(value)
        } else {
          return Promise.resolve(value).then(
            function (value) {
              step('next', value)
            },
            function (err) {
              step('throw', err)
            }
          )
        }
      }
      return step('next')
    })
  }
}

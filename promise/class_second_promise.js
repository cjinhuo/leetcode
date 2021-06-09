
class MyPromise {
  constructor(callback) {
    this.status = 'pending'
    this.value = undefined // status为resolved时返回的值
    this.reason = undefined // status为rejected时返回的值
    // 用来保存then传进来的函数，当状态改变时调用，声明成数组的原因是一个promise可能多处定义then或catch
    this.onFullfilledArray = []
    this.onRejectedArray = []
    try {
      // 由于resolve、reject都是在类外面执行的，所以需要绑定this
      callback(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  /** 传入两个promise，将第二个的promise的value或者reason转移到currentPromise
 * @callback resolve
 * @callback reject
 * @param {Promise} currentPromise 当前promise对象
 * @param {*} x 当前resolve或者reject之后的结果
 * @param {resolve} resolve 当前promise对象的resolve
 * @param {reject} reject 当前promise对象的reject
 */
  static resolvePromise(currentPromise, x, resolve, reject) {
    if (currentPromise === x) {
      reject(new TypeError('Chaining cycle'));
    }
    // 如果结果x存在且是对象或者是一个函数
    if (x && typeof x === 'object' || typeof x === 'function') {
      let used; // then(cb1,cb2)cb1,cb2两者只能调用其中一个
      try {
        let then = x.then;
        // 如果返回值x有then函数，则
        if (typeof then === 'function') {
          then.call(x, (y) => {
            if (used) return;
            used = true;
            MyPromise.resolvePromise(currentPromise, y, resolve, reject);
          }, (r) => {
            if (used) return;
            used = true;
            reject(r);
          });
        } else {
          if (used) return;
          used = true;
          resolve(x);
        }
      } catch (e) {
        if (used) return;
        used = true;
        reject(e);
      }
    } else {
      resolve(x);
    }
  }

  reject(error) {
    if (this.status === 'pending') {
      this.status = 'rejected'
      this.reason = error
      this.onRejectedArray.forEach(f => {
        // 执行then传的函数
        f(error)
      })
    }
    // console.log('reject', error)
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
    // console.log('resolved', value)
  }

  // then函数可以传一个或两个函数
  then(onFullfilled, onRejected) {
    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    let tempPromise,
      self = this
    switch (this.status) {
      case 'pending':
        tempPromise = new MyPromise((resolve, reject) => {
          // 保存.then传的第一个函数
          self.onFullfilledArray.push(function (value) {
            setTimeout(() => {
              try {
                let x = onFullfilled(value)
                MyPromise.resolvePromise(tempPromise, x, resolve, reject)
              } catch (error) {
                reject(error)
              }
            })
          })
          // 保存.then传的第二个函数
            self.onRejectedArray.push(function (reason) {
              setTimeout(() => {
                try {
                    let x = onRejected(reason)
                    MyPromise.resolvePromise(tempPromise, x, resolve, reject)
                } catch (error) {
                  reject(error)
                }
              })
            })
        })
        break;
      case 'resolved':
        tempPromise = new MyPromise((resolve, reject) => {
          setTimeout(() => {
            try {
                let x = onFullfilled(self.value)
                MyPromise.resolvePromise(tempPromise, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        break;
      case 'rejected':
        tempPromise = new MyPromise((resolve, reject) => {
          setTimeout(() => {
            try {
              if (onRejected) {
                let x = onRejected(self.reason)
                MyPromise.resolvePromise(tempPromise, x, resolve, reject)
              }
            } catch (error) {
              reject(error)
            }
          });
        })
        break;
    }
    return tempPromise
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

let onePromise = new MyPromise((resolve, reject) => {
  console.log('请求数据...')
  setTimeout(() => {
    reject(1)
  }, 100);
})
// 同步代码执行到这里时 twoPromise的状态为pending
// onePromise的状态需要过渡到twoPromise
const twoPromise = onePromise.then(res => {
  return 2
})
const three = twoPromise.catch(error => {
  console.log('catch', error)
})
three.catch(error => {
  console.log('catch')
})
// onePromise.catch(error => {
//   console.log('another', error)
// })












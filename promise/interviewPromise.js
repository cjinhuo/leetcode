class MyPromise {
  constructor(executor) {
    this.status = {
      pending: 'pending',
      fulfilled: 'fulfilled',
      rejected: 'rejected',
    }
    this.state = this.status.pending
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []
    this.resolve = value => {
      // 如果没有加这个判断，会在switch中的fulfilled分支无限递归
      if (this.state === this.status.pending) {
        this.state = this.status.fulfilled
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    this.reject = reason => {
      if (this.state === this.status.pending) {
        this.state = this.status.rejected
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      reject(err)
    }
  }

  // 返回新的promise
  // then(onFulfilled, onRejected) {
  //   return new MyPromise((resolve, reject) => {
  //     switch (this.state) {
  //       case this.status.pending:
  //         this.onResolvedCallbacks.push(() => {
  //           resolve(onFulfilled(this.value))
  //         })
  //         this.onRejectedCallbacks.push(() => {
  //           reject(onRejected(this.reason))
  //         })
  //         break
  //       case this.status.fulfilled:
  //         onFulfilled(this.value)
  //         break
  //       case this.status.rejected:
  //         onRejected(this.reason)
  //         break
  //     }
  //   })
  // }

  // 复用当前this
  then(onFulfilled, onRejected) {
    switch (this.state) {
      case this.status.pending:
        this.onResolvedCallbacks.push(() => {
          const lastValue = onFulfilled(this.value)
          this.resolve(lastValue)
          this.value = lastValue
        })
        this.onRejectedCallbacks.push(() => {
          const lastReason = onRejected(this.reason)
          this.reject(lastReason)
          this.reason = lastReason
        })
        break
      case this.status.fulfilled:
        onFulfilled(this.value)
        break
      case this.status.rejected:
        onRejected(this.reason)
        break
    }
    return this
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  }, 1000)
})
  .then(
    res => {
      console.log('resolve', res)
      return 1
    },
    reason => {
      console.log('reject', reason)
      return 2
    }
  )
  .then(
    res => {
      console.log(111, res)
      return 089879
    },
    reason => {
      console.log('reject', reason)
    }
  )

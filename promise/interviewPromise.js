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
    let resolve = value => {
      if (this.state === this.status.pending) {
        this.state = this.status.fulfilled
        this.value = value
        this.onResolvedCallbacks.forEach(fn => fn())
      }
    }
    let reject = reason => {
      if (this.state === this.status.pending) {
        this.state = this.status.rejected
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      switch (this.state) {
        case this.status.pending:
          this.onResolvedCallbacks.push(() => {
            resolve(onFulfilled(this.value))
          })
          this.onRejectedCallbacks.push(() => {
            reject(onRejected(this.reason))
          })
          break
        case this.status.fulfilled:
          resolve(onFulfilled(this.value))
          break
        case this.status.rejected:
          reject(onRejected(this.reason))
          break
      }
    })
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
    },
    reason => {
      console.log('reject', reason)
    }
  )
  .then(res => {
    console.log(res)
  })

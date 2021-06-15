// 简易版的观察者模式
class Subject {
  constructor() {
    this.observers = []
  }
  addObserver(observer) {
    this.observers.push(observer)
  }
  notify() {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
}

class Observer {
  constructor(fn) {
    this.update = fn
  }
}
const ob1 = new Observer(() => {
  console.log('this is ob1')
})
const ob2 = new Observer(() => {
  console.log('this is ob2')
})
const sub1 = new Subject()
sub1.addObserver(ob1)
sub1.addObserver(ob2)
sub1.notify()

function Parent() {
  this.name = 'father'
}
function Son(name, age) {
  Parent.call(this, name)
  this.age = age
}

function myCreate(proto) {
  function fn() {}
  fn.prototype = proto
  return fn
}
// 相当于中间穿插了一级fn
Son.prototype = myCreate(Parent.prototype)

Son.prototype.constructor = Son
const s = new Son('doudou', 18)

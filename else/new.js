function myNew(target, ...args) {
  const protoObj = Object.create(target.prototype)
  const result = target.apply(protoObj, args)
  return typeof result === 'object' ? result : protoObj
}

function A(name, age) {
  this.name = name || 'aa'
  this.age = age || 18
}

const a = myNew(A, 'cjh', 16)
console.log(a)

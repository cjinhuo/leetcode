function myNew(target, ...rest) {
  let child = Object.create(target.prototype)
  let result = target.apply(child, rest)
  return typeof result === 'object' ? result : child
}

function A(name, age) {
  this.name = name || 'aa'
  this.age = age || 18
}

const a = myNew(A, 'cjh', 16)
console.log(a)

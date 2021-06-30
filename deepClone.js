// function cloneByRecursive(source, hashStack = new WeakMap()) {
//   if (!isObject(source)) return source

//   let result = isArray(source) ? [] : {}

//   if (hashStack.has(source)) return hashStack.get(source)
//   hashStack.set(source, result)

//   for (let key in source) {
//     if (hasOwnProperty(source, key)) {
//       result[key] = isObject(source[key]) ? cloneByRecursive(source[key], hashStack) : source[key]
//     }
//   }
//   return result
// }

// function isObject(arg) {
//   return arg !== null && typeof arg === 'object'
// }

// function hasOwnProperty(target, key) {
//   return Object.prototype.hasOwnProperty.call(target, key)
// }

// function isArray(arg) {
//   return Array.isArray(arg)
// }

// function isUndefined(arg) {
//   return typeof arg === 'undefined'
// }

// const result = cloneByRecursive(oldObj)
// console.log('result', result)

function deepClone(source) {
  // WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失
  const hashStack = new WeakSet()
  const recursion = obj => {
    const result = Array.isArray(obj) ? [] : {}
    if (hashStack.has(obj)) return obj
    hashStack.add(obj)
    for (const key in obj) {
      let value = obj[key]
      // 假设只考虑object array
      result[key] = typeof value === 'object' ? recursion(value) : value
    }
    return result
  }
  return recursion(source)
}
// 构造函数
function person(pname) {
  this.name = pname
}

const Messi = new person('Messi')

// 函数
function say() {
  console.log('hi')
}
const oldObj = {
  a: say,
  b: new Array(1).fill(1),
  c: new RegExp('ab+c', 'i'),
  d: Messi,
}
oldObj.e = {}
oldObj.f = {
  e: oldObj.e,
}
oldObj.e.f = oldObj.f
const result = deepClone(oldObj)
console.log('result', result)

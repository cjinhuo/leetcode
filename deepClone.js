function cloneByRecursive(source, hashStack = new WeakMap()) {
  if (!isObject(source)) return source

  let result = isArray(source) ? [] : {}

  if (hashStack.has(source)) return hashStack.get(source)
  hashStack.set(source, result)

  for (let key in source) {
    if (hasOwnProperty(source, key)) {
      result[key] = isObject(source[key]) ? cloneByRecursive(source[key], hashStack) : source[key]
    }
  }
  return result
}

function isObject(arg) {
  return arg !== null && typeof arg === 'object'
}

function hasOwnProperty(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key)
}

function isArray(arg) {
  return Array.isArray(arg)
}

function isUndefined(arg) {
  return typeof arg === 'undefined'
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
  b: new Array(1),
  c: new RegExp('ab+c', 'i'),
  d: Messi,
}
oldObj.e = {}
oldObj.f = {
  e: oldObj.e,
}
oldObj.e.f = oldObj.f
const result = cloneByRecursive(oldObj)
console.log('result', result)

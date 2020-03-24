/**
 * 1.输入：“get1_install2_app3_list4_by5_android6”（每个单词后面总会携带一个数字，只有偶数才删掉），
// 写一个函数实现输出"get1InstallApp3ListBy5Android"
 * @param {String} str
 */
function getString(str) {
  if (str.length <= 1) return str
  const strArr = str.split('')
  const length = strArr.length
  for (let i = 1; i < length; i++) {
    if (strArr[i] === '_') {
      if (!isNaN(strArr[i - 1]) && !(Number(strArr[i - 1]) & 1)) {
        strArr[i - 1] = '_'
      }
      if (i + 1 < length) {
        strArr[i + 1] = (strArr[i + 1]).toUpperCase()
      }
    }
  }
  return strArr.join('').replace(/_/g, '')
}
getString('get1_install2_app3_list4_by5_android6')

/**
 * 2.不使用任何循环控制语句和迭代器的情况下实现一个0到1000的数组赋值。
 * @param {Number} l 数组长度
 */
function getArr(l = 1001) {
  const arr = Array(l);
  (function recursion(n) {
    if (n === arr.length) return
    arr[n] = n++
    recursion(n)
  })(0)
  return arr
}
getArr()

/**
 * 3.写一个函数能判断两个对象（注意特殊对象）内包含的内容是否一致。
 * @param {*} o1
 * @param {*} o2
 */
function isEualObject(o1, o2) {
  if (o1 === o2) return true
  if (o1 !== o1) return o2 !== o2
  if (typeof o1 === 'function' || typeof o2 === 'function') return false
  return deepEqual(o1, o2)
}
function deepEqual(o1, o2) {
  const typeString = obj => Object.prototype.toString.call(obj);
  const type1 = typeString(o1)
  const type2 = typeString(o2)
  if (type1 !== type2) return false;
  switch (type1) {
    case '[object Date]':
      return +o1 === +o2
    case '[object Boolean]':
      return o1 === o2
    case '[object RegExp]':
    case '[object String]':
      return '' + o1 === '' + o2
    case '[object Number]':
      if (o1 !== o1) return o2 !== o2
      return o1 === o2
    case '[object Symbol]':
      return String(o1) === String(o2)
  }
  for (let attr in o1) {
    if (!deepEqual(o1[attr], o2[attr])) {
      return false
    }
  }
  return true
}
let a = { test: 1, two: [{ test: { test: 1 }, reg: new RegExp(/asd/gi) }] }
let b = { test: 1, two: [{ test: { test: 1 }, reg: new RegExp(/asd/gi) }] }
console.log(isEualObject(a, b))
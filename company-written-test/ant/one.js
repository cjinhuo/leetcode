// 实现Array上的flat
Array.prototype.flat = function (d = 1) {
  function flatArr(arr, depth) {
    return depth > 0 ? arr.reduce((res, item) => (Array.isArray(item) ? res.concat(flatArr(item, depth - 1)) : res.concat(item)), []) : arr.slice()
  }
  return flatArr(this, d)
}

let arr = [1, 2, 4, [2, 34, [33]]]

console.log(arr.flat(1))

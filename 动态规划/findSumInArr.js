function walk(arr, Sum, index = 0, result = 0) {
  if (index === arr.length) {
    return result === Sum
  }
  return walk(arr, Sum,  index + 1, result) || walk(arr, Sum, index + 1, result + arr[index])
}
let arr = [1, 2, 3, 45, 5, 10]
console.log(walk(arr, 45))

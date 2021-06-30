function fibonacci(n) {
  if (n == 1 || n == 2) {
    return 1
  }
  // 会重复计算很多已经计算过的值了  所以用迭代的方式是比较好
  const result = fibonacci(n - 2) + fibonacci(n - 1)
  return result
}

console.log(fibonacci(6))

function whileFibonacci(n) {
  if (n == 1 || n == 2) {
    return 1
  }
  let p1 = 1,
    p2 = 1
  let arr = []
  for (let i = 2; i < n; i++) {
    arr.push(p1)
    const temp = p2
    p2 = p1 + p2
    p1 = temp
  }
  arr.push(p1)
  // 字节面试官要求打印出的数组
  console.log(arr)
  return p2
}

// console.log(whileFibonacci(6))

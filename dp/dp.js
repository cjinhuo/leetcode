function fb(n) {
  if (n <= 1) {
    return 1
  } else {
    return fb(n - 1) + fb(n - 2)
  }
}

// 尾递归
function tailRecursion(n, pre = 1, next = 1) {
  if (n <= 1) {
    return next
  } else {
    return tailRecursion(n - 1, next, pre + next)
  }
}
// 当n等3时就是 tailRecursion(2, 1, 1 + 1)
// 当n等2时就是 tailRecursion(1, 2, 1 + 2)
// 当n等1时就是 return 3
console.log(tailRecursion(8))
// console.log(fb(5))

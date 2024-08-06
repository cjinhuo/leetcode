// recursion
// function climbStairs(n) {
//   // 存储上一次的已经计算过的楼梯
//   const memo = {}
//   const recursion = n => {
//     if (memo[n]) {
//       console.log(memo)
//       return memo[n]
//     }
//     if (n === 1) {
//       return 1
//     } else if (n === 2) {
//       return 2
//     } else {
//       memo[n] = recursion(n - 1) + recursion(n - 2)
//     }
//     return memo[n]
//   }
//   return recursion(n)
// }

// loop O(n) O(n)
function climbStairsByDp(n) {
  if (n === 1 || n === 2) {
    return n
  }
  const dp = []
  dp[1] = 1
  dp[2] = 2
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}

// 数组平移法
function climbStairs(n) {
  if (n === 1 || n === 2) {
    return n
  }
  let first = 1,
    second = 2
  for (let i = 3; i <= n; i++) {
    const third = first + second
    first = second
    second = third
  }
  return second
}
console.log(climbStairs(10))

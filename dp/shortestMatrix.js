// 普通递归 暴力破解 时间复杂度：O(2^i+j) 空间复杂度:m+n（递归深度m+n）
function walk(matrix, i, j) {
  if (i === matrix.length - 1 && j === matrix[0].length - 1) {
    return matrix[i][j]
  }
  if (j === matrix[0].length - 1) {
    return matrix[i][j] + walk(matrix, i + 1, j)
  }
  if (i === matrix.length - 1) {
    return matrix[i][j] + walk(matrix, i, j + 1)
  }
  const right = walk(matrix, i, j + 1)
  const down = walk(matrix, i + 1, j)
  return matrix[i][j] + Math.min(right, down)
}

// 动态规划，逆向思维来求出最短路径
// 两层for循环:时间复杂度:m+n，空间复杂度:m+n
function dpOneWalk(matrix) {
  let dp = JSON.parse(JSON.stringify(matrix))
  for (let i = matrix.length - 1; i >= 0; i--) {
    for (let j = matrix[0].length - 1; j >= 0; j--) {
      if (i === matrix.length - 1 && j !== matrix[0].length - 1) {
        dp[i][j] = matrix[i][j] + dp[i][j + 1]
      } else if (j === matrix[0].length - 1 && i !== matrix.length - 1) {
        dp[i][j] = matrix[i][j] + dp[i + 1][j]
      } else if (j !== matrix[0].length - 1 && i !== matrix[0].length - 1) {
        dp[i][j] = matrix[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1])
      } else {
        dp[i][j] = matrix[i][j]
      }
    }
  }
  return dp[0][0]
}

function dpTwoWalk(matrix) {
  for (let i = matrix.length - 1; i >= 0; i--) {
    for (let j = matrix[0].length - 1; j >= 0; j--) {
      if (i == matrix.length - 1 && j != matrix[0].length - 1)
        matrix[i][j] = matrix[i][j] + matrix[i][j + 1];
      else if (j == matrix[0].length - 1 && i != matrix.length - 1)
        matrix[i][j] = matrix[i][j] + matrix[i + 1][j];
      else if (j != matrix[0].length - 1 && i != matrix.length - 1)
        matrix[i][j] = matrix[i][j] + Math.min(matrix[i + 1][j], matrix[i][j + 1]);
    }
  }

  return matrix[0][0]
}




let m = [
  [0, 1, 3, 4, 5, 6],
  [2, 3, 4, 5, 5, 6],
  [10, 23, 34, 45, 25, 14]
]
// 从终点向前开始计算路径距离
// [
//   ['38', '38', 37, 34, 30, 26],
//   [39, '37', '34', '30', '25', '20'],
//   [151, 141, 118, 84, 39, '14']
// ]
console.log(dpTwoWalk(m))

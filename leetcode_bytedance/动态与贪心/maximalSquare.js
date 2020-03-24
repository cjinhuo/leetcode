// 暴力查找 从头查找到尾
var violenceMaximalSquare = function(matrix) {
  const rows = matrix.length
  const cols = Array.isArray(matrix[0]) ? matrix[0].length : 0
  
}

// 动态规划 复制一份二维表 用来存已经遍历过的数字
var violenceMaximalSquare = function (matrix) {
  const dp = JSON.parse(JSON.stringify(matrix))
  const row = Array.isArray(matrix[0]) ? matrix[0].length : 0
  for (let i = 0; i < row; i++) {

  }
}

let matrix = [["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]

console.log(maximalSquare(matrix))
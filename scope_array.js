/**
 * 按条件合并相邻项
 * 说明：实现一个方法，可将数组中相邻的项按条件合并
 * 示例：
 *   adjoin([1, 2, 3, 4, 5], item => item !== 3); // [[1, 2], 3, [4, 5]]
 *   adjoin([1, 2, 3, 4], item => item < 3); // [[1, 2], 3, 4]
 */
function adjoin(arr, condition) {
  /* 代码实现 */
  let temp = []
  let result = []
  arr.forEach((v, i) => {
    console.log(condition(v))
    if (condition(v)){
      temp.push(v)
    } else {
      if (temp.length !== 0) {
        result.push(temp)
      }
      result.push(v)
      temp = []
    }
  })
  if (temp.length !== 0) {
      result.push(temp)
  }
  return result
  // 遍历，满足条件合并，不满足条件合并，满足条件合并
}
// console.log(adjoin([1, 2, 3, 4, 5], item => item !== 3))
console.log(adjoin([1, 2, 3, 4], item => item < 3))




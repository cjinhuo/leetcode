const arr = [[2,4], [3,6], [1,2],[6,10], [3,4]]

// 贪心算法

function overlapArr(arr){
  const length = arr.length
  if (length === 0) return 0;
  // 从小到大的排序
  arr.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1]
    }
    return a[0] - b[0]
  })
  console.log('排序完:', arr)
  // 因为预设了preIndex是不交集的，所以初始化为1
  let res = 1
  let preIndex = 0
  let normalStack = []
  normalStack.push(arr[preIndex])
  for (let i = 1; i < length; i++) {
    // [[1,2], [1,3], [2,3]] 从前两个开始向向后面比较：
    // 后面的第一个位数如果比前面的第二位数大的话，肯定就不会交集
    if (arr[i][0] >= arr[preIndex][1]) {
      normalStack.push(arr[i])
      res++
      preIndex = i
    }
  }
  console.log('不交集的集合:', normalStack)
  return length - res
}
console.log('移除会交集的数组:',overlapArr(arr))
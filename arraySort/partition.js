/**
 * 荷兰国旗问题 => 分成小于 等于 大于 num 的三个分区
 * @param {数组} arr
 * @param {需要分割的数字} num
 */
function partition(arr, num) {
  const length = arr.length
  // 取最左边和最右边的下标
  let l = -1,
    r = length,
    i = 0
  const swap = (first, second) => {
    if (first === second) return
    const tmp = arr[first]
    arr[first] = arr[second]
    arr[second] = tmp
  }
  while (i < r) {
    if (arr[i] < num) {
      swap(i, ++l)
      i++
    } else if (arr[i] > num) {
      swap(i, --r)
    } else {
      i++
    }
  }
  return arr
}

console.log(partition([10, 3, 2, -1, 5, 4], 4))

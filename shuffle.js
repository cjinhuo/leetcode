/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function (nums, n) {
  const getIndex = i => (i < n ? 2 * i : (i - n) * 2 + 1)
  for (let i = 0; i < 2 * n; i++) {
    let j = i
    while (nums[i] >= 0) {
      j = getIndex(j)
      let tmp = nums[i]
      nums[i] = nums[j]
      nums[j] = -tmp
    }
  }
  for (let i = 0; i < 2 * n; i++) {
    nums[i] = -nums[i]
  }
  return nums
}

console.log(shuffle([1, 2, 3, 4, 5, 6], 3))

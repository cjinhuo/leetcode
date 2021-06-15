/**
 *
 * @param {Array} nums 是一个已排好序的数组
 * @returns 去重过的数组
 */
var removeDuplicates = function (nums) {
  let cur = 0
  const length = nums.length
  for (let index = 1; index < length; index++) {
    if (nums[cur] !== nums[index]) {
      cur++
      nums[cur] = nums[index]
    }
  }
  return nums.slice(0, cur + 1)
}

console.log(removeDuplicates([0, 0, 1, 2, 2, 2, 2, 2, 3, 4]))

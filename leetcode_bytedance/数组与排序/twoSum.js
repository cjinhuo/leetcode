// 没有预先放入对象中是因为nums里面的值可能有重复的所以key会被覆盖
var twoSum = function (nums, target) {
  let obj = {}
  for (let i = 0; i < nums.length; i++) {
    const temp = target - nums[i]
    if (obj[temp]) {
      return [obj[temp] - 1, i]
    }
    obj[nums[i]] = i + 1
  }
  return []
}

console.log(twoSum([3, 2, 10, 3], 6))

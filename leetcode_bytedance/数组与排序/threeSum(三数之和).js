// 三数之和
// 暴力遍历法，但是超出时间限制 
// 时间复杂度：O(n3) 
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const result = []
  const obj = {}
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k =  j + 1; k < nums.length; k++) {
        let a = nums[i]
        let b = nums[j]
        let c = nums[k]
        const temp = [a, b, c].sort((a, b) => a - b)
        if (a + b + c === 0 && !obj[temp.toString()]){
          result.push(temp)
          obj[temp.toString()] = 1
        }
      }
    }
  }
  console.log(result)
  return result
};

// 转换成 2 + 1，可以改成O(n2) + 空间复杂度的O(n)
var threeSumSecond = function (nums) {
  const result = []
  const hash = {}
  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      if (hash[nums[j]]) {
        result.push([nums[j], ...hash[nums[j]]])
      } else {
        let mark = 0 - nums[i] - nums[j]
        // mark两两组合所需要的第三个数
        hash[mark] = [nums[i], nums[j]]
      }
    }
  }
  console.log(result)
  return result
};
// threeSumSecond([-1, 0, 1, 2, -1, -4])

var threeSumThird = function (nums){
  let res = []
  nums.sort((a, b) => a - b)
  // 如果排序完的数组最小值大于0 或 最大值小于0都不能组成 3个数和为0
  if (nums[0] >=0 || nums[nums.length - 1] <= 0) return []
  for (let i = 1; i < nums.length - 1; i++) {
    let first = 0,
        last = nums.length - 1
    while(first !== i && last !== i){
      const result = nums[i] + nums[first] + nums[last]
      if (result > 0) {
        last--
      } else if (result < 0) {
        first++
      } else {
        res.push([nums[first], nums[i], nums[last]])
        break;
      }
    }
  }
  return res
}
// threeSumThird([-1, 0, 1, 2, -1, -4])


var threeSum = function (nums) {
  let res = []
  if (nums.length < 3) return []
  nums.sort((a, b) => a - b)
  if (nums[0] > 0 || nums[nums.length - 1] < 0) return []
  for (let i = 0; i < nums.length - 1; i++) {
    // 如果当前位置大于0，那么后面的数肯定都大于0，相加肯定不为0，直接return
    if (nums[i] > 0) {
      return res
    }
    if (i > 0 && nums[i] === nums[i - 1]) continue
    // left 是从i的后面一位开始，right是从数组的最后一个开始，
    // 然后两个指针移动，当碰到的时候就结束当前循环
    let left = i + 1,
      right = nums.length - 1
    while (left < right) {
      const result = nums[i] + nums[left] + nums[right]
      if (result > 0) {
        right--
      } else if (result < 0) {
        left++
      } else {
        res.push([nums[i], nums[left], nums[right]])
        // 例如 -1 0 0 0 0 0 1 => 左指针指向0后一直右移
        while (left < right && nums[left] === nums[left + 1]) {
          left++
        }
        // 例如-1 0 1 1 1 1 1 1 => 右指针指向1后一直左移 
        while (left < right && nums[right] === nums[right - 1]) {
          right--
        }
        right--
        left++
      }
    }
  }
  return res
}
threeSumFour([-1, 0, 1, 2])
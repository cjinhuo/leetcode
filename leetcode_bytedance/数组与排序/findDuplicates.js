/**
 * 注意看题：1 ≤ a[i] ≤ n （n为数组长度），比如：1 2 3 4 1 2 3 4
 * 给定一个整数数组 a，其中1 ≤ a[i] ≤ n （n为数组长度）, 其中有些元素出现两次而其他元素出现一次。

  找到所有出现两次的元素。

你可以不用到任何额外空间并在O(n)时间复杂度内解决这个问题吗？
// 输入: [4, 3, 2, 7, 8, 2, 3, 1];

// 输出: [2, 3];
 * @param {Array} nums 
 */
function findDuplicates(nums) {
  const res = [];
  nums.forEach(item => {
    const absNum = Math.abs(item);
    if (nums[absNum - 1] < 0) {
      res.push(absNum);
    } else {
      console.log('index', absNum - 1, -1 * nums[absNum - 1]);
      nums[absNum - 1] = -1 * nums[absNum - 1];
    }
    console.log(nums);
  });

  return res;
}

console.log(findDuplicates([2, 4, 5, 4, 2]));

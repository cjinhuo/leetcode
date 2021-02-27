// 字符串的全排列
/**
 * 输入abc
 * 输出：["abc","acb","bac","bca","cab","cba"]
 * @param {*} str
 */
function permutations(str) {
  const arr = [];
  const permute = (str, result = '') => {
    if (str.length === 1) {
      arr.push(result + str[0]);
      return;
    }
    for (let i = 0; i < str.length; i++) {
      const res = [...str];
      const s = res.splice(i, 1);
      permute(res, result + s);
    }
  };
  permute(str);
  return arr;
}
let str = 'abc';
console.log(permutations(str));

// 彬哥写的
var permute = function (nums, count) {
  if (count === undefined || count > nums.length) count = nums.length;
  let rest = nums.length - count;
  return (function walk(nums) {
    let arr = [];
    for (let i = 0; i < nums.length; i++) {
      let s = [...nums];
      let c = s.splice(i, 1);
      if (s.length > rest) {
        let r = walk(s);
        r.forEach(a => arr.push(c.concat(a)));
      } else {
        arr.push(c);
      }
    }
    return arr;
  })(nums);
};

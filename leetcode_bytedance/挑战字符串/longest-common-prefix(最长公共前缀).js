// 最长公共前缀
// 最长前缀是从0下标开始算
// 例子： flower fl fa => f
// flow fl ab => ''
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 0 || strs[0].length === 0) return ''
  const str = strs[0]
  const common = []
  for (let i = 0; i < str.length; i++) {
    for (let j = 1; j < strs.length; j++) {
      console.log(strs[j], i)
      if (str[i] !== strs[j][i]) {
        return common.join("")
      }
    }
    common.push(str[i]);
  }
  // 如果全部遍历完，说明全部字符串都一样
  return str
};

console.log('')

console.log(longestCommonPrefix(['flow', 'fl']))



// var longestCommonPrefix = function (strs) {
//   if (strs.length === 0 || strs[0].length === 0) { return ""; }
//   var str = strs[0],
//     common = [];
//   for (let i = 0, len1 = str.length; i < len1; i++) {
//     for (let j = 1, len2 = strs.length; j < len2; j++) {
//       if (str[i] !== strs[j][i]) {
//         return common.join("");
//       }
//     }
//     common.push(str[i]);
//   } return str;
// };
// 无重复字符的最长子串
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (s.length === 1) return 1
  let obj = {}
  let max = 0
  for(let v of s){
    if (obj[v]) {
      let stack = Object.keys(obj)
      for (let i = 0; i < stack.length; i++) {
        delete obj[stack[i]] //"dvdf" 遍历到d时删掉第一个d，然后继续遍历
        if (stack[i] === v) {
          obj[stack[i]] = 1
          break;
        }
      }
    } else {
      obj[v] = 1
    }
    const length = Object.keys(obj).length
    max = Math.max(max, length)
  }
  return max
};


var lengthOfLongestSubstring = function (s) {
  var num = 0;
  var res = 0;
  var m = '';

  for (value of s) {
    if (!~m.indexOf(value)) {
      m += value;
      num++;
      res = res < num ? num : res;
    } else {
      m += value;
      m = m.slice(m.indexOf(value) + 1) // 与上面的原理是一样的："acdvdf" 当遇到第二个d时删掉acd保留vdf
      num = m.length
    }

  }
  return res
};

console.log(lengthOfLongestSubstring("dvdf"))
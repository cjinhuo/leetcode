// 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式，字符串只能是0-9的数字。
// 示例：
// 输入: "25525511135"
// 输出: ["255.255.11.135", "255.255.111.35"]
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const res = []
  // 回溯
  const recursion = (result, surplusStr) => {
    console.log(result, surplusStr)
    // 如果surplusStr比剩余的空数（3个）还大的话可以直接return，因为肯定不是一个合格的ip地址
    if (surplusStr.length > (4 - result.length) * 3) {
      return
    }
    if ((result.length === 4 && surplusStr.length !== 0) || (result.length > 4 || result.length < 4 && surplusStr.length === 0)) {
      return
    }
    if (result.length === 4 && surplusStr.length === 0) {
      res.push(result.join('.'))
      return
    }
    recursion([...result, surplusStr[0]], surplusStr.slice(1))
    if (surplusStr[0] != 0 && surplusStr.length > 1) {
      recursion([...result, surplusStr.slice(0, 2)], surplusStr.slice(2))
    }
    if (surplusStr[0] != 0 && parseInt(surplusStr.slice(0, 3)) <= 255 && surplusStr.length > 2) {
      recursion([...result, surplusStr.slice(0, 3)], surplusStr.slice(3))
    }
  }
  recursion([], s)
  return res;
};
const start = new Date().getTime()
console.log(restoreIpAddresses('25512511135'))
const end = new Date().getTime()
console.log(end - start)
//回溯 在一个函数中执行多次的当前函数，并且每次调用时都会触发调用栈+1，
// 然后在某个时刻return或加判断就会回到某个时刻继续执行下去，下面还有可执行当前函数的语句。（回溯）
var restoreIpAddresses = function (s) {
  var res = [];
  function hs(result, str) {
    console.log(result, str)
    if (result.length === 4 && str.length !== 0 || result.length > 4 || result.length < 4 && str.length == 0)
      return;
    if (result.length === 4 && str.length === 0) {
      res.push(result.join("."));
      return;
    }
    hs([...result, str[0]], str.slice(1));
    if (str[0] != 0 && str.length > 1)
      hs([...result, str.slice(0, 2)], str.slice(2));
    if (str[0] != 0 && parseInt(str.slice(0, 3)) <= 255 && str.length > 2)
      hs([...result, str.slice(0, 3)], str.slice(3));
  }
  hs([], s);
  return res;
};

// restoreIpAddresses('25512511135')
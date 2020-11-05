// 字符串的子序列 c b bc a ac ab abc
function getSubsequence(str) {
  const recursion = (target, index = 0, result = '') => {
    if (index === target.length) {
      console.log(result);
      return;
    }
    recursion(target, index + 1, result);
    recursion(target, index + 1, result + target[index]);
  };
  recursion(str);
}

getSubsequence('abc');

// 字符串的子串 [ 'a', 'ab', 'abc', 'b', 'bc', 'c' ]
function getSubString(str) {
  const arr = [];
  for (let i = 0; i < str.length; i++) {
    let result = '';
    for (let j = i; j < str.length; j++) {
      result = result + str[j];
      arr.push(result);
    }
  }
  console.log(arr);
  return arr;
}
// getSubString('abc');

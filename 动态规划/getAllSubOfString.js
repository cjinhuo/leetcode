// 字符串的子序列
function getSubsequence(str, index = 0, result = '') {
  if (index === str.length){
    console.log(result)
    return
  }
  getSubsequence(str, index + 1, result)
  getSubsequence(str, index + 1, result + str[index])
}

// getSubsequenceOfString('abc')

// 字符串的子串
function getSubString(str){
  const arr = []
  for (let i = 0; i < str.length; i++) {
    let result = ''
    for (let j = i; j < str.length; j++) {
      result = result + str[j]
      arr.push(result)
    }
  }
  console.log(arr)
  return arr
}
getSubString('abc')



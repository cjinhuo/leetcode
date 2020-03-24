function decodeString(str) {
  // 系数栈
  let coefficientStack = []
  // 结果集栈
  let resultStack = []
  let result = ''
  // 初始化系数为0
  let coefficient = 0
  for (let i = 0; i < str.length; i++) {
    let current = str.charAt(i)
    switch (current) {
      case '[': 
      // 当碰到'['就将以前收集字符串和系数的推入栈中
      // 重新开始收集字符串和系数
        coefficientStack.push(coefficient)
        resultStack.push(result)
        result = ''
        coefficient = 0
        break;
      case ']': 
      // 碰到']'代表结束：计算当前[]中的字符串，和
        let count = coefficientStack.pop()
        let tempResult = ''
        // 将收集到字符串翻成系数倍
        for (let j = 0; j < count; j++) {
          tempResult += result
        }
        // 和前面已经求得的字符串进行拼接
        result = resultStack.pop() + tempResult
        break;
      default: 
        if (current >= 0 && current <= 9) {
          // 系数累积 2[ab16[cd]] 下面的代码为了让16能够存下来，current - '0'是为了隐式转换成数字
          coefficient = coefficient * 10 + (current - '0');
        } else {
          // 字母累加 字符串收集
          result += current;
        }
        break;
    }
  }
  return result
} 

function recursionDecode(str, n){
  let coefficient = 0
  let result = ''
  for (let i = n; i < str.length; i++) {
    let current = str.charAt(i)
    switch (current) {
      case '[':
        // 递归，并将下一次的下标传进去
        let temp = recursionDecode(str, i + 1)
        i = temp[0]
        let tempResult = temp[1]
        // 将收集到字符串翻成系数倍
        for (let j = 0; j < coefficient; j++) {
          result += tempResult
        }
        
        coefficient = 0
        break;
      case ']':
        return [i, result]
      default:
        if (current >= 0 && current <= 9) {
          // 系数累积 2[ab16[cd]] 下面的代码为了让16能够存下来，current - '0'是为了隐式转换成数字
          coefficient = coefficient * 10 + (current - '0');
        } else {
          // 字母累加 字符串收集
          result += current;
        }
        break;
    }
  }
  return result
}


let str = '2[abc3[a]]3[cjh]'
// console.log(decodeString(str))
console.log(recursionDecode(str, 0))







function format(num) {
  const arr = String(num).split('.')
  const first = arr.shift()
  const second = arr.shift()
  const firstStr = setEndDot(first)
  if (!second) {
    return firstStr
  }
  const secondStr = setStartDot(second)
  return firstStr + '.' + secondStr
}

function setStartDot(numStr) {
  let count = 0
  const result = []
  for (let i = 0; i < numStr.length; i++) {
    count++
    result.push(numStr[i])
    if (count % 3 === 0) {
      result.push(',')
    }
  }
  return result.join('')
}
function setEndDot(numStr) {
  let count = 0
  let result = []
  for (let i = numStr.length - 1; i >= 0; i--) {
    count++
    result.unshift(numStr[i])
    if (count % 3 === 0) {
      result.unshift(',')
    }
  }
  return result.join('')
}
// 来未来前端二面笔试题
// ============= 测试用例 ==============
console.log(format(12345.6789))
console.log(format(1234567))
console.log(format(0.1234567))

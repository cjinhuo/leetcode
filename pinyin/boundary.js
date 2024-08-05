const pinyinMap = require('./py.json')


function getBoundary(str) {
  const lowerStr = str.toLocaleLowerCase()
  const pinyinArray = Array(lowerStr.length)

  for (let i = 0; i < lowerStr.length; i++) {
    const currentChar = lowerStr[i]
    const charInPinyin = pinyinMap[currentChar]
    pinyinArray[i] = [currentChar, ...(charInPinyin ? charInPinyin.slice() : [])]
  }

  const boundary = [[-1, -1]]
  let accumulator = 0
  const originIndices = []
  const totalChars = []
  pinyinArray.forEach((value, index) => {
    // index 是原有字符的下标
    totalChars.push(value[0])
    boundary.push([index, accumulator])
    originIndices.push(accumulator)
    accumulator++
    if (value.length > 1) {
      // 说明是一个汉字，剩下的是拼音
      for (i = 1; i < value.length; i++) {
        const pinyinItem = value[i]
        totalChars.push(pinyinItem)
        const length = pinyinItem.length
        boundary.push(...Array(length).fill([index, accumulator]))
        accumulator += length
      }
    }
  })
  const pinyinStr = totalChars.join('')
  originIndices[pinyinArray.length] = pinyinStr.length // todo 感觉可以去掉
  console.log(' boundary', boundary, originIndices)
  return {
    pinyinStr,
    boundary,
    originIndices,
    length: pinyinArray.length
  }
}
getBoundary('no你的_百度搜索')
// no你ni的dedi_百bai度du搜sou索suo
// no你的_百度搜索

module.exports = {
  getBoundary
}
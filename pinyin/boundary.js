const pinyinMap = require('./py.json')


function getBoundary(str) {
  const lowerStr = str.toLocaleLowerCase()
  const pinyinArray = Array(lowerStr.length)

  for (let i = 0; i < lowerStr.length; i++) {
    const currentChar = lowerStr[i]
    const charInPinyin = pinyinMap[currentChar]
    pinyinArray[i] = [currentChar, ...(charInPinyin ? charInPinyin.slice() : [])]
  }

  const boundary = []
  let accumulator = 0
  const originalIndices = []
  const totalChars = []
  pinyinArray.forEach((value, index) => {
    // index 是原有字符的下标
    totalChars.push(value[0])
    boundary.push([index, accumulator])
    originalIndices.push(accumulator)
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
  const pinyinString = totalChars.join('')
  originalIndices[pinyinArray.length] = pinyinString.length // todo 感觉可以去掉
  return {
    pinyinString,
    boundary,
    originalIndices,
    originalLength: pinyinArray.length
  }
}
// console.log(getBoundary('no你d的'))
// {
//   pinyinString: 'no你ni的dedi_百bai度du搜sou索suo',
//     boundary: [
//       [0, 0], [1, 1],
//       [2, 2], [2, 3], [2, 3],
//       [3, 5], [3, 6], [3, 6],
//       [3, 8], [3, 8], [4, 10],
//       [5, 11], [5, 12], [5, 12],
//       [5, 12], [6, 15], [6, 16],
//       [6, 16], [7, 18], [7, 19],
//       [7, 19], [7, 19], [8, 22],
//       [8, 23], [8, 23], [8, 23]
//     ],
//       originalIndices: [
//         0, 1, 2, 5, 10,
//         11, 15, 18, 22, 26
//       ],
//         originalLength: 9
// }
// no你ni的dedi_百bai度du搜sou索suo
// no你的_百度搜索
module.exports = {
  getBoundary
}
const { getBoundary } = require('./boundary')

const originalStr = 'anonode'
const data = getBoundary(originalStr)
console.log('data', data)
const input = 'node'


// 明天先写  anonode 匹配 node，然后再考虑拼音匹配
const matchPath = [
  [null, null, null, null, null],
  [null, null, null, null, null],
  [null, [2, 2, 1], null, null, null],
  [null, [2, 2, 1], [2, 3, 2], null, null],
  [null, [2, 2, 1], [2, 3, 2], null, null],
  [null, [2, 2, 1], [2, 3, 2], null, null],
  [null, [2, 2, 1], [2, 3, 2], [4, 6, 3], null],
  // [开始位置， 结束位置， 匹配的个数] 匹配的个数没有必要存储，用结束位置减去开始位置即可
  [null, [2, 2, 1], [2, 3, 2], [4, 6, 3], [4, 7, 4]],
]

function matchPinyin(data, target) {
  const { pinyinString, boundary, originIndices } = data
  const targetLength = target.length
  const pinyinLength = pinyinString.length
  if (!data || !target || pinyinLength < targetLength) return undefined

  const matchPositions = Array(targetLength).fill(-1)

  // 下标统一默认都从 0 开始
  let matchIndex = 0
  for (let i = 0; i < pinyinLength && matchIndex < targetLength; i++) {
    if (pinyinString[i] === target[matchIndex]) {
      matchPositions[matchIndex++] = i
    }
  }

  // 如果输入字符小于匹配到的字符，判定无效
  if (matchIndex < targetLength) return undefined


  const defaultDpTableValue = [0, 0, -1, -1]
  // 当前字母的 [连续字母匹配个数, score， 开始位置, 结束位置]
  const dpTable = Array.from({ length: pinyinLength }, () => defaultDpTableValue)
  const dpScores = Array(pinyinLength + 1).fill(0)
  const matchPath = Array.from({ length: pinyinLength }, () => Array(targetLength))

  // matchIndex 和上面的 matchIndex 表示同一个意思，所以取同样的名字
  for (let matchIndex = 0; matchIndex < matchPositions.length; matchIndex++) {
    // 表示匹配字符在 pinyinString 中的开始位置，可能后面也有相同字符，所以需要遍历至结尾，来计算连续匹配的个数
    let matchedPinyinIndex = matchPositions[matchIndex]
    for (; matchedPinyinIndex < pinyinLength; matchedPinyinIndex++) {
      // matchedPinyinIndex 为 0 时返回默认值
      const prevScore = dpScores[matchedPinyinIndex - 1] || 0
      const [prevMatchedLetters, prevBoundaryStart, prevBoundaryEnd] = dpTable[matchedPinyinIndex - 1] || defaultDpTableValue

      //matchedPinyinIndex === boundaryArray[matchedPinyinIndex][1]
      // 的dedi 的 =>[x, y] d => [x, y+1] e => [x, y+1] d => [x, y+2] di => [x, y+2]
      const isNewWord = matchedPinyinIndex === boundary[matchedPinyinIndex][1] &&
        prevBoundaryStart !== boundary[matchedPinyinIndex][0]

      // for pinyin：是否是连续匹配的首字母，比如你 上一个是 n，下一个 i， isContinuation 为 true
      const isContinuation = prevMatchedLetters > 0 && prevBoundaryEnd === boundary[matchedPinyinIndex][1]
      const isEqual = pinyinString[matchedPinyinIndex] === target[matchIndex]
      if (isEqual && (isNewWord || isContinuation)) {
        const currentScore = prevMatchedLetters * 2 + 1

        // 只有 大于等于 前一次分数才更新元素状态，比如： no_node, 输入 nod 匹配到后面的 nod
        if (currentScore >= prevScore) {
          dpScores[matchedPinyinIndex] = currentScore
          dpTable[matchedPinyinIndex] = [prevMatchedLetters + ~~isNewWord, boundary[matchedPinyinIndex][0], boundary[matchedPinyinIndex][1]]
        }

        // 只有 大于 才需要替换 matchPath，不然就命中前面，比如 no_no 输入 no 命中第一次的 no
        if (currentScore > prevScore) {
          const originalStringIndex = boundary[matchedPinyinIndex][0];
          matchPath[matchedPinyinIndex][matchIndex] = [originalStringIndex - prevMatchedLetters, originalStringIndex]
        } else {
          matchPath[matchedPinyinIndex][matchIndex] = matchPath[matchedPinyinIndex - 1][matchIndex]
        }
        continue
      }
      // 如果没有匹配到相同字符，matchPath 服用上一次的值
      dpScores[matchedPinyinIndex] = prevScore
      matchPath[matchedPinyinIndex][matchIndex] = matchPath[matchedPinyinIndex - 1][matchIndex]
    }

  }

  if (matchPath[pinyinLength - 1][targetLength - 1] === undefined) return undefined;


  console.log(matchPath[pinyinLength - 1][targetLength - 1])
  // let gIndex = pinyinLength;
  // let tIndex = targetLength;
  // console.log('matchPath', matchPath);
  // console.log('dpTable', dpTable)

}

console.log(matchPinyin(data, input))

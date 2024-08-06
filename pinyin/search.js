const { getBoundary } = require('./boundary')

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

  // 下标统一默认都从 0 开始，但会有个不优雅的地方：在第 0 个获取 0 - 1 时需要判空
  let matchIndex = 0
  for (let i = 0; i < pinyinLength && matchIndex < targetLength; i++) {
    if (pinyinString[i] === target[matchIndex]) {
      matchPositions[matchIndex++] = i
    }
  }

  // 如果输入字符小于匹配到的字符，判定无效
  if (matchIndex < targetLength) return undefined

  const defaultDpTableValue = [0, 0, -1, -1]
  // x你 => x你ni target = ni
  // n => [1, 1, xx, xx] i => [1, 2, xx, xx]
  // [匹配字符个数：一个汉字算一个字符，统计当前已匹配的字符个数， 匹配字母个数：一个拼音中的一个字母算一个，统计当前已匹配的字母数， 原始字符串的开始位置, 原始字符串的结束位置]
  const dpTable = Array.from({ length: pinyinLength }, () => defaultDpTableValue)
  const dpScores = Array(pinyinLength).fill(0)
  const matchPath = Array.from({ length: pinyinLength }, () => Array(targetLength))
  const getDpTableByIndex = (_index) => dpTable[_index] || defaultDpTableValue

  // matchIndex 和上面的 matchIndex 表示同一个意思，所以取同样的名字
  for (let matchIndex = 0; matchIndex < matchPositions.length; matchIndex++) {
    // 表示匹配字符在 pinyinString 中的开始位置，可能后面也有相同字符，所以需要遍历至结尾，来计算连续匹配的个数
    let matchedPinyinIndex = matchPositions[matchIndex]
    let currentDpTableItem = getDpTableByIndex(matchedPinyinIndex - 1)

    // console.log('current str:', pinyinString[matchedPinyinIndex])
    // 重置上一个得分，外层 for 循环的第一次肯定有字母匹配，如果不重置会导致 dpTable 不更新
    matchedPinyinIndex > 1 && (dpScores[matchedPinyinIndex - 1] = 0)
    // dpTable[matchedPinyinIndex - 1] = defaultDpTableValue

    for (; matchedPinyinIndex < pinyinLength; matchedPinyinIndex++) {
      // matchedPinyinIndex 为 0 时返回默认值
      const prevScore = dpScores[matchedPinyinIndex - 1] || 0
      // string => 一个字符，如一个汉字或一个英文
      // letter => 一个拼音中的一个字母
      const [prevMatchedStrings, prevMatchedLetters, prevBoundaryStart, prevBoundaryEnd] = currentDpTableItem
      // 用于缓存当次结果，给下次使用，因为下方有个逻辑：如果 gap 不是 0 || 1 将被重置
      currentDpTableItem = dpTable[matchedPinyinIndex]
      // currentTableEntry = dpTable[currentMatchPos];
      //matchedPinyinIndex === boundaryArray[matchedPinyinIndex][1]
      // 的dedi 的 =>[x, y] d => [x, y+1] e => [x, y+1] d => [x, y+2] di => [x, y+2]

      const isNewWord = matchedPinyinIndex === boundary[matchedPinyinIndex][1] &&
        prevBoundaryStart !== boundary[matchedPinyinIndex][0]

      // for pinyin：是否是连续匹配的首字母，比如”你“ 上一个是 n，下一个 i，也适配多音字，比如“的” dedi，匹配到 de 后不会在匹配 di
      const isContinuation = prevMatchedStrings > 0 && prevBoundaryEnd === boundary[matchedPinyinIndex][1]
      const isEqual = pinyinString[matchedPinyinIndex] === target[matchIndex]
      if (isEqual && (isNewWord || isContinuation)) {
        const currentScore = prevMatchedLetters * 2 + 1

        const matchedLettersCount = prevMatchedLetters + 1;
        // 只有 大于等于 前一次分数才更新元素状态，比如： no_node, 输入 nod 匹配到后面的 nod
        if (currentScore >= prevScore) {
          dpScores[matchedPinyinIndex] = currentScore
          // prevMatchedStrings + ~~isNewWord:连续匹配的字符个数
          dpTable[matchedPinyinIndex] = [prevMatchedStrings + ~~isNewWord, matchedLettersCount, boundary[matchedPinyinIndex][0], boundary[matchedPinyinIndex][1]]
        }

        // 只有 大于 才需要替换 matchPath，不然就命中前面，比如 no_no 输入 no 命中第一次的 no
        if (currentScore > prevScore) {
          // 原始字符串对应的下标
          const originalStringIndex = boundary[matchedPinyinIndex][0];
          // 首字母时 prevMatchedStrings = 0，不是首字母时应该加 1，下标才能对的上
          matchPath[matchedPinyinIndex][matchIndex] = [originalStringIndex - prevMatchedStrings + ~~!isNewWord, originalStringIndex, matchedLettersCount]
        } else {
          matchPath[matchedPinyinIndex][matchIndex] = matchPath[matchedPinyinIndex - 1][matchIndex]
        }
        continue
      }

      // 如果没有匹配到相同字符，matchPath 服用上一次的值
      dpScores[matchedPinyinIndex] = prevScore
      matchPath[matchedPinyinIndex][matchIndex] = matchPath[matchedPinyinIndex - 1][matchIndex]
      // 当前匹配与上一个匹配的 gap ，比如 abc, 第一次是 a 第二次是 b，gap = 1,第一次 a 第二次是 c ，gap = 2，
      // 这里指的是原文，而不是 pinyin，比如 c测试，假如 c 已经命中了，那么“测“和 c 的 gap 为 1，复用 dpTable 中的值
      const gap = boundary[matchedPinyinIndex][0] - getDpTableByIndex(matchedPinyinIndex - 1)[2];
      // 表示下一个字符的拼音对应还是当前汉字, 比如 试shi, s 和 h 都对应 "试" 的下标
      const isSameWord = () => boundary[matchedPinyinIndex][0] === boundary[matchedPinyinIndex + 1][0]
      const isWithInRange = matchedPinyinIndex < pinyinLength - 1
      dpTable[matchedPinyinIndex] = gap === 0 || (isWithInRange && gap === 1 && isSameWord()) ? getDpTableByIndex(matchedPinyinIndex - 1) : defaultDpTableValue;
    }
  }

  if (matchPath[pinyinLength - 1][targetLength - 1] === undefined) return undefined;

  const hitIndices = []
  for (let i = targetLength - 1; i >= 0;) {
    const [start, end, matchedLetters] = matchPath[pinyinLength - 1][i]
    hitIndices.unshift([start, end])
    i -= matchedLetters
  }
  return hitIndices
}

function getHighlightText(str) {
  return `\x1b[32m${str}\x1b[0m`
}

function highlightTextWithRanges(str, ranges) {
  const result = [];
  let index = 0;

  for (let range of ranges) {
    const [start, end] = range;

    if (index < start) {
      result.push(str.slice(index, start));
    }

    result.push(getHighlightText(str.slice(start, end + 1)))

    index = end + 1;
  }

  if (index < str.length) {
    result.push(str.slice(index));
  }

  return result.join('');
}

const originalString = 'nd你的这是测试'
const input = 'nzsc'
const hitIndices = matchPinyin(getBoundary(originalString), input)
console.log('hitIndices', hitIndices)
console.log('original string:', originalString, 'input:', input)
console.log(highlightTextWithRanges(originalString, hitIndices))






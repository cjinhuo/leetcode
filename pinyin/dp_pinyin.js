const { getBoundary } = require('./origin_boundary')
function matchPinyin(data, target, startIndex, endIndex) {
  // 转换成拼音后的数据
  startIndex = startIndex !== null && startIndex !== undefined ? startIndex : 0;
  endIndex = endIndex !== null && endIndex !== undefined ? endIndex : data.originalLength;

  // 提取子数组
  const pinyinString = data.pinyinString.slice(data.originalIndices[startIndex], data.originalIndices[endIndex]);
  const boundaryArray = data.boundary.slice(data.originalIndices[startIndex], data.originalIndices[endIndex] + 1);
  const pinyinLength = pinyinString.length;
  const targetLength = target.length;

  if (!data || !target || pinyinLength < targetLength) return [];

  const matchPositions = Array(targetLength + 1).fill(0);
  let matchIndex = 1;
  for (let i = 1; i <= pinyinLength && matchIndex <= targetLength; i++) {
    if (pinyinString[i - 1] === target[matchIndex - 1]) {
      matchPositions[matchIndex++] = i;
    }
  }

  // 如果输入字符小于匹配到的字符，判定无效
  if (matchIndex <= targetLength) return undefined;

  const dpTable = Array.from({ length: pinyinLength + 1 }, () => [0, 0, -1, -1]);
  const matchScores = Array(pinyinLength + 1).fill(0);
  const matchPath = Array.from({ length: pinyinLength + 1 }, () => Array(targetLength + 1));
  for (let targetIndex = 1; targetIndex <= targetLength; targetIndex++) {
    let currentMatchPos = matchPositions[targetIndex];
    let currentScore = matchScores[currentMatchPos - 1];
    let currentTableEntry = dpTable[currentMatchPos - 1];
    // 为什么要重置前一个的 matchScore 和 dpTable
    matchScores[currentMatchPos - 1] = 0;
    dpTable[currentMatchPos - 1] = [0, 0, -1, -1];

    for (; currentMatchPos <= pinyinLength; currentMatchPos++) {
      console.log('pipei', pinyinString[currentMatchPos - 1])
      let prevScore = currentScore;
      const [prevMatchedLetters, prevLettersUsed, prevStart, prevEnd] = currentTableEntry;
      currentScore = matchScores[currentMatchPos];
      currentTableEntry = dpTable[currentMatchPos];

      //是否是新词的首字母：currentMatchPos === boundaryArray[currentMatchPos][1] + 1
      // 双重保险：上一个词不是当前词的下标： prevStart !== boundaryArray[currentMatchPos][0]
      const isNewWord = currentMatchPos === boundaryArray[currentMatchPos][1] + 1
        && (prevStart !== boundaryArray[currentMatchPos][0]);

      // 是否是连续匹配的首字母，比如你 上一个是 n，下一个 i， isContinuation 为 true
      const isContinuation = prevMatchedLetters > 0
        && prevEnd === boundaryArray[currentMatchPos][1]
        && pinyinString[currentMatchPos - 2] === target[targetIndex - 2];

      // if (prevMatchedLetters > 0 && prevEnd === boundaryArray[currentMatchPos][1] && !(currentMatchPos >= 2 && targetIndex >= 2))
      //   throw 'assertion failed: (i<2||j<2)';
      const isCharEqual = pinyinString[currentMatchPos - 1] === target[targetIndex - 1]
      // 上一次得分大于 0，算是
      if (isCharEqual && (isNewWord || isContinuation) && (targetIndex === 1 || prevScore > 0)) {
        // if (prevLettersUsed + (isContinuation ? 1 : currentMatchPos - (boundaryArray[currentMatchPos][1])) !== prevLettersUsed + 1)
        //   throw 'assertion failed: lettersUsedInCurRange !== prevNumMatchedLetters+1';

        // 累加连续字符匹配的个数
        const matchedLettersCount = prevLettersUsed + 1;
        // 加两次 prevLettersUsed 是为了鼓励连续的匹配，连续的越多，得分就成倍增加，和单个字母配拉开差距
        // todo 感觉也可移除，加 2 即可？
        prevScore += prevLettersUsed + prevLettersUsed + 1;

        if (prevScore >= matchScores[currentMatchPos - 1]) {
          matchScores[currentMatchPos] = prevScore;
          // 
          dpTable[currentMatchPos] = [prevMatchedLetters + ~~isNewWord, matchedLettersCount, boundaryArray[currentMatchPos][0], boundaryArray[currentMatchPos][1]];

          // 原字符串的下标，而不是转成拼音后的下标
          const matchedCharRealIndex = boundaryArray[currentMatchPos][0] + 1;
          // 只有大于才需要替换，不然就命中前面，比如 node_node 输入 no 命中第一次的 no
          if (prevScore > matchScores[currentMatchPos - 1]) {
            matchPath[currentMatchPos][targetIndex] = [matchedCharRealIndex - prevMatchedLetters, matchedCharRealIndex]
          } else {
            matchPath[currentMatchPos][targetIndex] = matchPath[currentMatchPos - 1][targetIndex];
          }
          continue;
        }
      }
      // 如果没有匹配字符串相等则当前匹配得分复用上次，匹配路径也是如此
      matchScores[currentMatchPos] = matchScores[currentMatchPos - 1];
      matchPath[currentMatchPos][targetIndex] = matchPath[currentMatchPos - 1][targetIndex];
      // 当前匹配与上一个匹配的 gap ，比如 abc, 第一次是 a 第二次是 b，gap = 1,第一次 a 第二次是 b ，gap = 2，
      // 这里指的是原文，而不是 pinyin，比如 测ce试shi
      const gap = boundaryArray[currentMatchPos][0] - (dpTable[currentMatchPos - 1][2] !== undefined ? dpTable[currentMatchPos - 1][2] : -1);
      // 下一个字符的拼音对应还是当前字符, 比如 测ce试shi, s 和 h 都对应 "试" 的下标
      // boundaryArray[currentMatchPos + 1][0] === boundaryArray[currentMatchPos][0]
      dpTable[currentMatchPos] = gap === 0 || (currentMatchPos < pinyinLength && gap === 1 && boundaryArray[currentMatchPos + 1][0] === boundaryArray[currentMatchPos][0]) ? dpTable[currentMatchPos - 1] : [0, 0, -1, -1];
    }
  }

  if (matchPath[pinyinLength][targetLength] === undefined) return undefined;
  console.log('match', matchPath)
  let gIndex = pinyinLength;
  let tIndex = targetLength;
  // console.log('matchPath', matchPath);
  // console.log('dpTable', dpTable)
  const matchResults = [];
  for (let zIndex = data.originalIndices[startIndex]; tIndex > 0;) {
    const [start, end] = matchPath[gIndex][tIndex];
    matchResults.push([startIndex + start, startIndex + end]);
    gIndex = data.originalIndices[start + startIndex] - zIndex - 1;
    const matchedCount = end - start + 1
    tIndex -= matchedCount;
  }
  matchResults.reverse();
  return matchResults;
}

// 测试代码
const originalStr = 'ano是node测试';
// const originalStr = 'a你';
// const data = { "pinyinStr": "no你ni的de", "boundary": [[-1, -1], [0, 0], [1, 1], [2, 2], [2, 3], [2, 3], [3, 5], [3, 6], [3, 6]], "originalIndices": [0, 1, 2, 5], "length": 4 }
const data = getBoundary(originalStr);
console.log('data', data)
const input = 'sces';
console.log(matchPinyin(data, input, 0, originalStr.length));


// 明天先写  anonode 匹配 node，然后再考虑拼音匹配
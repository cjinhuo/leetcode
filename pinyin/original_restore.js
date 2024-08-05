function matchPinyin(data, target, startIndex, endIndex) {
  // 转换成拼音后的数据
  startIndex = startIndex !== null && startIndex !== undefined ? startIndex : 0;
  endIndex = endIndex !== null && endIndex !== undefined ? endIndex : data.length;

  // 提取子数组
  const pinyinArray = data.pc.slice(data.za[startIndex], data.za[endIndex]);
  const boundaryArray = data.boundary.slice(data.za[startIndex], data.za[endIndex] + 1);
  const pinyinLength = pinyinArray.length;
  const targetLength = target.length;

  if (!data || !target || pinyinLength < targetLength) return [];

  const startBoundary = boundaryArray[1][0];
  const endBoundary = boundaryArray[1][1];
  const matchResults = [];
  const matchPositions = Array(targetLength + 1).fill(0);
  let matchIndex = 1;
  for (let i = 1; i <= pinyinLength && matchIndex <= targetLength; i++) {
    if (pinyinArray[i - 1] === target[matchIndex - 1]) {
      matchPositions[matchIndex++] = i;
    }
  }

  if (matchIndex <= targetLength) return matchResults;

  const dpTable = Array.from({ length: pinyinLength + 1 }, () => [0, 0, -1, -1]);
  const matchScores = Array(pinyinLength + 1).fill(0);
  const matchPath = Array.from({ length: pinyinLength + 1 }, () => Array(targetLength + 1));

  for (let targetIndex = 1; targetIndex <= targetLength; targetIndex++) {
    let currentMatchPos = matchPositions[targetIndex];
    let currentScore = matchScores[currentMatchPos - 1];
    let currentTableEntry = dpTable[currentMatchPos - 1];
    matchScores[currentMatchPos - 1] = 0;
    dpTable[currentMatchPos - 1] = [0, 0, -1, -1];

    for (; currentMatchPos <= pinyinLength; currentMatchPos++) {
      let prevScore = currentScore;
      const [prevMatchedLetters, prevLettersUsed, prevStart, prevEnd] = currentTableEntry;
      currentScore = matchScores[currentMatchPos];
      currentTableEntry = dpTable[currentMatchPos];

      const isNewWord = currentMatchPos === boundaryArray[currentMatchPos][1] - endBoundary + 1
        && (prevStart !== boundaryArray[currentMatchPos][0] - startBoundary);
      const isContinuation = prevMatchedLetters > 0
        && prevEnd === boundaryArray[currentMatchPos][1] - endBoundary
        && pinyinArray[currentMatchPos - 2] === target[targetIndex - 2];

      if (prevMatchedLetters > 0 && prevEnd === boundaryArray[currentMatchPos][1] - endBoundary && !(currentMatchPos >= 2 && targetIndex >= 2))
        throw 'assertion failed: (i<2||j<2)';

      if (pinyinArray[currentMatchPos - 1] === target[targetIndex - 1] && (isNewWord || isContinuation) && (targetIndex === 1 || prevScore > 0)) {
        if (prevLettersUsed + (isContinuation ? 1 : currentMatchPos - (boundaryArray[currentMatchPos][1] - endBoundary)) !== prevLettersUsed + 1)
          throw 'assertion failed: lettersUsedInCurRange !== prevNumMatchedLetters+1';

        const matchedLettersCount = prevLettersUsed + 1;
        prevScore += prevLettersUsed + prevLettersUsed + 1;

        if (prevScore >= matchScores[currentMatchPos - 1]) {
          matchScores[currentMatchPos] = prevScore;
          dpTable[currentMatchPos] = [prevMatchedLetters + Number(isNewWord), matchedLettersCount, boundaryArray[currentMatchPos][0] - startBoundary, boundaryArray[currentMatchPos][1] - endBoundary];

          const totalMatched = boundaryArray[currentMatchPos][0] - startBoundary + 1;
          matchPath[currentMatchPos][targetIndex] = prevScore > matchScores[currentMatchPos - 1] ? [totalMatched - prevMatchedLetters, totalMatched, matchedLettersCount] : matchPath[currentMatchPos - 1][targetIndex];
          continue;
        }
      }
      matchScores[currentMatchPos] = matchScores[currentMatchPos - 1];
      matchPath[currentMatchPos][targetIndex] = matchPath[currentMatchPos - 1][targetIndex];
      const gap = boundaryArray[currentMatchPos][0] - startBoundary - (dpTable[currentMatchPos - 1][2] !== undefined ? dpTable[currentMatchPos - 1][2] : -1);
      dpTable[currentMatchPos] = gap === 0 || (currentMatchPos < pinyinLength && gap === 1 && boundaryArray[currentMatchPos + 1][0] === boundaryArray[currentMatchPos][0]) ? dpTable[currentMatchPos - 1] : [0, 0, -1, -1];
    }
  }

  if (matchPath[pinyinLength][targetLength] === undefined) return matchResults;

  let gIndex = pinyinLength;
  let tIndex = targetLength;
  for (let zIndex = data.za[startIndex]; tIndex > 0;) {
    const [start, end, matchedCount] = matchPath[gIndex][tIndex];
    matchResults.push([startIndex + start, startIndex + end, matchedCount]);
    gIndex = data.za[start + startIndex] - zIndex - 1;
    tIndex -= matchedCount;
  }
  matchResults.reverse();
  return matchResults;
}

// 测试代码
const originalStr = 'no你的';
const data = { "pc": "no你ni的de", "boundary": [[-1, -1], [0, 0], [1, 1], [2, 2], [2, 3], [2, 3], [3, 5], [3, 6], [3, 6], [3, 8], [3, 8], [4, 10], [5, 11], [5, 12], [5, 12]], "za": [0, 1, 2, 5, 10], "length": 4 }
const input = 'nd';

console.log(matchPinyin(data, input, 0, originalStr.length));
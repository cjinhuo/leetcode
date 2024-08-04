function wordBreak(s, wordDict) {
  const len = s.length;
  const dict = new Set(wordDict);
  const memo = new Array(len);

  function dfs(start) {
    if (memo[start]) {
      return memo[start];
    }
    if (start > s.length - 1) {
      return [[]];
    }
    const res = [];
    for (let i = start + 1; i <= len; i++) {
      const word = s.slice(start, i);
      if (dict.has(word)) {
        const restRes = dfs(i);
        for (const restWords of restRes) {
          // [word] 放在这里面确保只有最后一个字符串在 dict 中才会被返回
          res.push([word].concat(restWords));
        }
      }
    }

    memo[start] = res;
    return res;
  }
  return dfs(0).map((words) => {
    return words.join(' ');
  });
}


wordBreak('catsandog', ["cat", "cats", "and", "sand", "dog"])
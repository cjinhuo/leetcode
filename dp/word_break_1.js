/** leetcode url https://leetcode.cn/problems/word-break/
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
// s = "applepenapple", wordDict = ["apple", "pen"]
// true
// s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
// [ ] [c] [a] [t] [s] [a] [n] [d] [o] [g]
// [1] [0] [0] [1] [1] [0] [0] [1] [0] [0]
// false
// [ ] [l] [e] [e] [d] [c] [o] [d] [e]
// [1] [0] [0] [0] [1] [0] [0] [0] [1]
const wordBreak = function (s, wordDict) {
  const dp = new Array(s.length + 1).fill(false)
  const wordSet = new Set(wordDict)
  dp[0] = true
  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      // O(n^2)
      // console.log(j, i, s.slice(j, i))
      if (dp[j] && wordSet.has(s.slice(j, i))) {
        console.log(j, i, s.slice(j, i))
        dp[i] = true
        break
      }
    }
  }
  console.log(dp)
  return dp[s.length]
};


const wordBreakOptimize = function (s, wordDict) {
  const trueSet = new Set([0])
  const wordSet = new Set(wordDict)
  for (let i = 0; i <= s.length; i++) {
    for (let j of trueSet) {
      // O(M * n)
      if (wordSet.has(s.slice(j, i))) {
        trueSet.add(i)
        break
      }
    }
  }
  return trueSet.has(s.length)
}

// wordBreak('leetcode', ['leet', 'code'])
// wordBreak('catsanddog', ["cats", "dog", "sand", "and", "cat"])
wordBreakOptimize('catsanddog', ["cats", "dog", "sand", "and", "cat"])
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s.length % 2 !== 0) return false
  const map = {
    '{': '}',
    '[': ']',
    '(': ')',
  }
  const stack = []
  for (const char of s) {
    if (map[char]) {
      stack.push(map[char])
    } else if (!(stack.pop() === char)) {
      return false
    }
  }
  if (stack.length !== 0) return false
  return true
}

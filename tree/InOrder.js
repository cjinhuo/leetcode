let tree = require('./treeData')
// 中序遍历 左中右
function inOrder(root, result = []) {
  if (root === null) return
  inOrder(root.left, result)
  result.push(root.val)
  inOrder(root.right, result)
  return result
}
console.log(inOrder(tree))

function iterationInOrder(root) {
  const stack = []
  const result = []
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    result.push(root.val)
    root = root.right
  }
  return result
}
iterationInOrder(tree)

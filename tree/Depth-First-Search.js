let tree = require('./treeData')
// 深度优先遍历其实就是先序遍历：中左右
function recursionDfs(root, result = []) {
  if (root === null) return
  result.push(root.val)
  recursionDfs(root.left, result)
  recursionDfs(root.right, result)
  return result
}
console.log(recursionDfs(tree))

function iterationDfs(root) {
  const stack = []
  const result = []
  while (root || stack.length) {
    while (root) {
      result.push(root.val)
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    root = root.right
  }
  console.log(result)
  return result
}

iterationDfs(tree)

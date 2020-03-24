let tree = require('./treeData')
// 先序遍历 中左右
function preOrder(root, result = []) {
  if (root === null) return
  result.push(root.val)
  preOrder(root.left, result)
  preOrder(root.right, result)
  console.log(result)
  return result
}

preOrder(tree)

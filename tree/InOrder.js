let tree = require('./treeData')
// 中序遍历 左中右 
function inOrder(root, result = []) {
  if (root === null) return
  inOrder(root.left, result)
  result.push(root.val)
  inOrder(root.right, result)
  console.log(result)
  return result
}

inOrder(tree)

let tree = require('./treeData')
// 后序遍历 左右中 递归 
function postOrder(root, result = []) {
  if (root === null) return
  postOrder(root.left, result)
  postOrder(root.right, result)
  result.push(root.val)
  console.log(result)
  return result
}

postOrder(tree)

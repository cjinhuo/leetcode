let tree = require('./treeData');
// 深度优先遍历其实就是先序遍历：中左右
function preOrder(root, result = []) {
  if (root === null) return;
  result.push(root.val);
  preOrder(root.left, result);
  preOrder(root.right, result);
  console.log(result);
  return result;
}

preOrder(tree);

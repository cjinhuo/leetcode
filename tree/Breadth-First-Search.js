let tree = require('./treeData')
// 非递归 广度优先搜索遍历 bfs => Breadth-First-Search
function iterationBfs(root) {
  const stack = [root]
  const result = []
  while (stack.length !== 0) {
    const node = stack.shift()
    if (node.left) {
      stack.push(node.left)
    }
    if (node.right) {
      stack.push(node.right)
    }
    result.push(node.val)
  }
  return result
}

console.log(iterationBfs(tree))

// 递归
let bfsWithRecursion = function (root) {
  const result = [root.val]
  const recursion = node => {
    const nodes = []
    if (node.left) {
      nodes.push(node.left)
      result.push(node.left.val)
    }
    if (node.right) {
      nodes.push(node.right)
      result.push(node.right.val)
    }
    nodes.forEach(v => {
      recursion(v)
    })
  }
  recursion(root)
  console.log(result)
  return result
}

bfsWithRecursion(tree)

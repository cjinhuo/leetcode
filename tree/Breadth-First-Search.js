let tree = require('./treeData');
// 非递归 广度优先搜索遍历 bfs => Breadth-First-Search
let bfsWithoutRecursion = function (root) {
  const stack = [root];
  const result = [];
  while (stack.length !== 0) {
    const node = stack.shift();
    result.push(node.val);
    if (node.left) {
      stack.push(node.left);
    }
    if (node.right) {
      stack.push(node.right);
    }
  }
  console.log(result);
  return result;
};

// 递归
let bfsWithRecursion = function (root) {
  const result = [root.val];
  const recursion = node => {
    const nodes = [];
    if (node.left) {
      nodes.push(node.left);
    }
    if (node.right) {
      nodes.push(node.right);
    }
    nodes.forEach(v => {
      result.push(v.val);
    });
    nodes.forEach(v => {
      recursion(v);
    });
  };
  recursion(root);
  console.log(result);
  return result;
};

bfsWithRecursion(tree);

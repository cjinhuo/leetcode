const temp = {}
function printTree(list) {
  const roots = restoreTree(list)
  leftRecursion(roots)
}
function getCount(root) {
  let count = 0
  function upParent(root) {
    if (root.parentId) {
      count++
      upParent(temp[root.parentId])
    }
  }
  upParent(root)
  return count
}
function leftRecursion(roots) {
  if (!roots) {
    return
  }
  console.log(new Array(getCount(roots)).fill('  ').join(''), roots.value)
  leftRecursion(roots.left)
  leftRecursion(roots.right)
}

function restoreTree(list) {
  if (list.length === 0) {
    return null
  }
  const root = {
    value: list[0].name,
    id: list[0].id,
    left: null,
    right: null,
    parentId: list[0].parentId,
  }
  temp[list[0].id] = root
  if (list.length === 1) {
    return root
  }
  for (let i = 1; i < list.length; i++) {
    const hasParant = temp[list[i].parentId]
    if (hasParant) {
      const childNode = {
        value: list[i].name,
        id: list[i].id,
        left: null,
        right: null,
        parentId: list[i].parentId,
      }
      if (hasParant.left) {
        hasParant.right = childNode
      } else {
        hasParant.left = childNode
      }
      temp[list[i].id] = childNode
    }
  }
  return root
}
//============= 测试代码 ==============
const list = [
  { id: 1001, parentId: 0, name: 'AA' },
  { id: 1002, parentId: 1001, name: 'BB' },
  { id: 1003, parentId: 1001, name: 'CC' },
  { id: 1004, parentId: 1003, name: 'DD' },
  { id: 1005, parentId: 1003, name: 'EE' },
  { id: 1006, parentId: 1002, name: 'FF' },
  { id: 1007, parentId: 1002, name: 'GG' },
  { id: 1008, parentId: 1004, name: 'HH' },
  { id: 1009, parentId: 1005, name: 'II' },
]
// 将数组还原成二叉树
// 先序遍历二叉树 再计算当前的节点是在第几层
// 来未来前端二面笔试题
printTree(list)

// 输出：
// AA
//    BB
//      FF
//      GG
//    CC
//      DD
//        HH
//      EE
//        II

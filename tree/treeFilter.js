const data = [{
  id: 1,
  txt: '测试1',
  children: [{
    id: 11,
    txt: '测11',
    children: [{
      id: 111,
      txt: '测试111',
      children: [{
        id: 1111,
        txt: '这里就不是',
        children: []
      }]
    }]
  }, {
    id: 12,
    txt: '测试12',
    children: [{
      id: 121,
      txt: '测试121',
      children: [{
        id: 1211,
        txt: '测试1211',
        children: []
      }]
    }]
  }]
}, {
  id: 2,
  txt: '测试2',
  children: [{
    id: 21,
    txt: '测试21'
  }]
}]

// function filterTree(nodes, keyword) {
//   // 利用回溯，优先遍历子节点，遍历完子节点然后给父节点打上标签，时间复杂度为O(2n)
//   const setFlag = (nodes, keyword) => {
//     // 给父节点返回的标志
//     let isParentNeed = false
//     nodes.forEach(item => {
//       if (item.children && item.children.length !== 0) {
//         item.isNeed = setFlag(item.children, keyword)
//       }
//       if (item.txt.includes(keyword)) {
//         isParentNeed ? '' : isParentNeed = true
//         item.isNeed = true
//       } else {
//         item.isNeed ? isParentNeed = true : item.isNeed = false
//       }
//     })
//     return isParentNeed
//   }
//   const filterNotIsNeed = nodes => {
//     return nodes.filter(item => {
//       if (item.children && item.children.length) {
//         item.children = filterNotIsNeed(item.children)
//       }
//       return item.isNeed
//     })
//   }
//   setFlag(nodes, keyword)
//   return filterNotIsNeed(nodes)
// }
// console.log(filterTree(data, '测试'))


function filterTree(nodes, keyword) {
  // 利用回溯，优先遍历子节点，遍历完子节点然后给父节点打上标签，时间复杂度为O(n)
  const setFlagAndSplice = (nodes, keyword) => {
    // 给父节点返回的标志
    let isParentNeed = false
    nodes.forEach((item, index) => {
      if (item.children && item.children.length !== 0) {
        item.isNeed = setFlag(item.children, keyword)
      }
      if (item.txt.includes(keyword)) {
        isParentNeed ? '' : isParentNeed = true
        item.isNeed = true
      } else {
        item.isNeed ? isParentNeed = true : item.isNeed = false
      }
      if (!item.isNeed) {
        nodes.splice(index, 1)
      }
    })
    return isParentNeed
  }
  setFlagAndSplice(nodes, keyword)
  return nodes
}
console.log(filterTree(data, '测试'))


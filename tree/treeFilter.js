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

const data = [
  {
    id: 1,
    txt: '测试1',
    children: [
      {
        id: 11,
        txt: '测11',
        children: [
          {
            id: 111,
            txt: '测试111',
            children: [
              {
                id: 1111,
                txt: '这里就不是',
                children: [],
              },
            ],
          },
        ],
      },
      {
        id: 12,
        txt: '测试12',
        children: [
          {
            id: 121,
            txt: '测试121',
            children: [
              {
                id: 1211,
                txt: '测试1211',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    txt: '测试2',
    children: [
      {
        id: 21,
        txt: '测试21',
      },
    ],
  },
]

// function filterTree(nodes, keyword) {
//   // 利用回溯，优先遍历子节点，遍历完子节点然后给父节点打上标签，时间复杂度为O(n)
//   const setFlagAndSplice = (nodes, keyword) => {
//     // 给父节点返回的标志
//     let isParentNeed = false

//     nodes.forEach((item, index) => {
//       if (item.children && item.children.length !== 0) {
//         item.isNeed = setFlagAndSplice(item.children, keyword)
//       }
//       console.log(item.txt)
//       if (item.txt.includes(keyword)) {
//         isParentNeed ? '' : (isParentNeed = true)
//         item.isNeed = true
//       } else {
//         item.isNeed ? (isParentNeed = true) : (item.isNeed = false)
//       }
//       if (!item.isNeed) {
//         nodes.splice(index, 1)
//       }
//     })
//     return isParentNeed
//   }
//   setFlagAndSplice(nodes, keyword)
//   return nodes
// }
// console.log(filterTree(data, '测试121'))

function filterTreeOne(nodes, keyword) {
  const setFlagAndRemoveDeepChild = curNodes => {
    let isParentNeed = false
    for (let i = 0; i < curNodes.length; i++) {
      const item = curNodes[i]
      if (item.children && item.children.length !== 0) {
        item.isNeed = setFlagAndRemoveDeepChild(item.children)
      }
      if (item.txt.includes(keyword)) {
        isParentNeed ? '' : (isParentNeed = true)
        item.isNeed = true
      } else {
        item.isNeed ? (isParentNeed = true) : (item.isNeed = false)
      }
      if (!item.isNeed) {
        curNodes.splice(i, 1)
        i--
      }
    }
    return isParentNeed
  }
  setFlagAndRemoveDeepChild(nodes)
  return nodes
}

console.log(JSON.stringify(filterTreeOne(data, '测试121')))

// let a = [1, 2, 3]
// for (let i = 0; i < a.length; i++) {
//   console.log(a[i])
//   if (i === 1) {
//     a.splice(i, 1)
//     i--
//   }
// }

// function recurse(nodes) {
//   nodes.forEach(item => {
//     if (item.children && item.children.length !== 0) {
//       recurse(item.children)
//     }
//     console.log(item.txt)
//   })
// }

// recurse(data)

// function recurseFor(nodes) {
//   for (let i = 0; i < nodes.length; i++) {
//     const item = nodes[i]
//     if (item.children && item.children.length !== 0) {
//       recurse(item.children)
//     }
//     console.log(item.txt)
//   }
// }
// recurseFor(data)

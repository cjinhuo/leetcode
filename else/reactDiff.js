function reactDiff(prevChildren, nextChildren, parent) {
  let lastIndex = 0
  for (let i = 0; i < nextChildren.length; i++) {
    let nextChild = nextChildren[i],
      find = false
    for (let j = 0; j < prevChildren.length; j++) {
      let prevChild = prevChildren[j]
      if (nextChild.key === prevChild.key) {
        find = true
        patch(prevChild, nextChild, parent)
        if (j < lastIndex) {
          // 移动到前一个节点的后面
          let refNode = nextChildren[i - 1].el.nextSibling
          parent.insertBefore(nextChild.el, refNode)
        } else {
          // 不需要移动节点，记录当前位置，与之后的节点进行对比
          lastIndex = j
        }
        break
      }
    }
    if (!find) {
      // 插入新节点
      let refNode = i <= 0 ? prevChildren[0].el : nextChildren[i - 1].el.nextSibling
      mount(nextChild, parent, refNode)
    }
  }
  for (let i = 0; i < prevChildren.length; i++) {
    let prevChild = prevChildren[i],
      key = prevChild.key,
      has = nextChildren.find(item => item.key === key)
    if (!has) parent.removeChild(prevChild.el)
  }
}

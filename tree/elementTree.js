// 时间复杂度在O(n)~O(2n)之间
function filter(value) {
  const filterNodeMethod = this.filterNodeMethod;
  const lazy = this.lazy;
  const traverse = function (node) {
    const childNodes = node.root ? node.root.childNodes : node.childNodes;

    childNodes.forEach(child => {
      child.visible = filterNodeMethod.call(child, value, child.data, child);

      traverse(child);
    });

    if (!node.visible && childNodes.length) {
      let allHidden = true;
      // 需要优化的点
      allHidden = !childNodes.some(child => child.visible);

      if (node.root) {
        node.root.visible = allHidden === false;
      } else {
        node.visible = allHidden === false;
      }
    }
    if (!value) return;

    if (node.visible && !node.isLeaf && !lazy) node.expand();
  };

  traverse(this);
}

// 饿了么的filter优化
// 在element的`element/packages/tree/src/model/tree-store.js`中的filter函数
// 时间复杂度稳定在O(n)
function myFilter(value) {
  const filterNodeMethod = this.filterNodeMethod;
  const lazy = this.lazy;
  const traverse = function (node) {
    const childNodes = node.root ? node.root.childNodes : node.childNodes;
    let allHidden = true;
    childNodes.forEach(child => {
      child.visible = traverse(child);
      if (filterNodeMethod.call(child, value, child.data, child)) {
        allHidden = false;
        child.visible = true;
      } else {
        child.visible ? (allHidden = false) : (child.value = false);
      }
    });
    if (!node.visible && childNodes.length) {
      if (node.root) {
        node.root.visible = allHidden === false;
      }
    }
    if (!value) return true;
    if (node.visible && !node.isLeaf && !lazy) node.expand();
    // 用子元素返回给父元素
    return !allHidden;
  };
  traverse(this);
}

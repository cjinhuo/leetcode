// 跟LRU差不多的结构 map + 双向链表
// map存储 key:key,value：值 1+~~ 插入key时，先在map中对应的key加1，然后判断当前curMax、curMin然后决定是否放入头结点或尾结点
// 重点是将curMax、curMin利用好
// curMax、curMin变换：inc时变换

var NodeData = function ({ key = null, value = null }) {
  this.key = key
  this.value = value
}
var Node = function (data) {
  this.pre = null
  this.next = null
  this.data = new NodeData(data)
}
var AllOne = function () {
  var DoublyLinkedList = function () {
    this.head = new Node({ key: 'null', value: 'null' })
    this.last = new Node({ key: 'null', value: 'null' })
    this.head.next = this.last
    this.last.pre = this.head
    this.length = 0
  }

  // 在从前往后在指定位置添加节点
  DoublyLinkedList.prototype.insertWithDataKeyForward = function (position, node) {
    let current = this.head
    if (position === 0) {
      this.insert(current, node)
    }
    if (position > 0 && position <= this.length) {
      for (let i = 0; i < position; i++) {
        current = current.next
      }
      this.insert(current, node)
    }
  }

  // 在前一个节点后面插入节点
  DoublyLinkedList.prototype.insert = function (preNode, currentNode) {
    // 保存下一个节点
    nextNode = preNode.next
    // 当前节点连接上一个节点
    preNode.next = currentNode
    currentNode.pre = preNode
    // 当前节点连接下一个节点
    currentNode.next = nextNode
    nextNode.pre = currentNode
    this.length++
  }

  // 在从后往前在指定位置添加节点
  DoublyLinkedList.prototype.insertWithDataKeyBackward = function (position, node) {
    let current = this.last.pre
    if (position === 0) {
      this.insert(current, node)
    }
    if (position > 0 && position <= this.length) {
      for (let i = 0; i < position; i++) {
        current = current.pre
      }
      this.insert(current, node)
    }
  }

  // 移除当前节点
  DoublyLinkedList.prototype.removeCurrentNode = function (currentNode) {
    let preNode = currentNode.pre
    let nextNode = currentNode.next
    preNode.next = nextNode
    nextNode.pre = preNode
    this.length--
  }

  // 根据从到右的位置移除对应节点
  DoublyLinkedList.prototype.removeWithPosition = function (position) {
    if (this.length === 0) return
    if (this.position > 0 && this.position <= this.length) {
      let currentNode = this.head
      for (let i = 0; i < position; i++) {
        currentNode = currentNode.next
      }
      this.removeCurrentNode(currentNode)
    }
  }
  this.list = new DoublyLinkedList()
  this.map = new Map()
  this.curMax = 1
  this.curMin = 1
};

/**
 * Inserts a new key <Key> with value 1. Or increments an existing key by 1. 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.inc = function (key) { 
  let curNode
  if (this.map.has(key)){
    curNode = this.map.get(key)
    const curValue = ++curNode.data.value
    // 判断是否在头结点、中间结点、尾结点
    if (this.curMax <= curValue){
      this.curMax = curValue
      this.list.removeCurrentNode(curNode)
      this.list.insertWithDataKeyForward(0, curNode)
    } 
    else if (curValue - this.curMin === 1) {
      // 当前节点本来就在末尾
      this.curMin = curValue
      if (curNode.pre && curNode.pre.data.value < this.curMin) {
        this.list.removeCurrentNode(curNode)
        this.list.insertWithDataKeyBackward(1, curNode)
      }
      // 本身就在最后一个，就没有必要在删除 插入了，跟下面得逻辑一样
      // this.list.removeCurrentNode(curNode)
      // this.list.insertWithDataKeyBackward(0, curNode)
    }
     else {
      // 当前值在最大值和最小值中间，所以在第一个位置插入节点
      this.list.removeCurrentNode(curNode)
      this.list.insertWithDataKeyBackward(1, curNode)
    }
  } else {
    curNode = new Node(new NodeData({key, value: 1}))
    this.map.set(key, curNode)
    this.list.insertWithDataKeyBackward(0, curNode)
    // 插入新节点 最小值重置成1
    this.curMin = 1
  }
};

/**
 * Decrements an existing key by 1. If Key's value is 1, remove it from the data structure. 
 * @param {string} key
 * @return {void}
 */
AllOne.prototype.dec = function (key) {
  if(!this.map.has(key)){
    return
  }
  const curNode = this.map.get(key)
  const curValue = --curNode.data.value
  if (curValue === 0) {
    this.map.delete(key)
    this.list.removeCurrentNode(curNode)
  } else {
    if (this.curMax <= curValue) {
      this.curMax = curValue
      // 最大值--，没有必要再次删除 插入，因为本来就是在第一个
      // this.list.removeCurrentNode(curNode)
      // this.list.insertWithDataKeyForward(0, curNode)
    } else if (this.curMin >= curValue) {
      this.curMin = curValue
      this.list.removeCurrentNode(curNode)
      this.list.insertWithDataKeyBackward(0, curNode)
    } else {
      this.list.removeCurrentNode(curNode)
      this.list.insertWithDataKeyBackward(1, curNode)
    }
  }
};

/**
 * Returns one of the keys with maximal value.
 * @return {string}
 */
AllOne.prototype.getMaxKey = function () {
  if (this.list.length === 0) {
    return ''
  }
  return this.list.head.next.data.key
};

/**
 * Returns one of the keys with Minimal value.
 * @return {string}
 */
AllOne.prototype.getMinKey = function () {
  if (this.list.length === 0) {
    return ''
  }
  return this.list.last.pre.data.key
};
let all = new AllOne()

const arr = [["a"], ["b"], ["c"], ["d"], ["a"], ["b"], ["c"], ["d"], ["c"], ["d"], ["d"], ["a"]]
arr.forEach(v => {
  all.inc(v[0])
})
console.log('maxKey:', all.getMaxKey())
console.log('minKey:', all.getMinKey())



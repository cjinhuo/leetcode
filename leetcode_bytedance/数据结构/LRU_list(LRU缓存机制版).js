// 插入数据时，首先判断cache中是否有该结点？如果没有，检查缓存是否还有空间？
// 如果没有空间，清除双线链表的尾部结点。将该结点插入到双向链表的头部
// 最先使用的放入头结点，依次排列

// 可以用数组来代替双向链表 => 发现替代不了，因为当需要删除某个key时，数组中需要查找下标（不能保存下标，因为下标是变换的）
// 在双向链表中可以保存当前节点，可以寻找到上一个和下一个节点，可以直接删除。
// 时间复杂度 O(1)
// 空间复制度 O(n)

var NodeData = function ({ key = null, value = null }) {
  this.key = key
  this.value = value
}
var Node = function (data) {
  this.pre = null
  this.next = null
  this.data = new NodeData(data)
}

/**
 * @param {number} capacity
 */
var Cache = function (capacity) {
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

  // 找出位置 从左向右开始找
  DoublyLinkedList.prototype.findPosition = function (node) {}

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
  this.capacity = capacity
  // map里面存的是：key:key，value：当前节点
  this.map = new Map()
}

/**
 * @param {number} key
 * @return {number}
 */
Cache.prototype.get = function (key) {
  if (this.map.has(key)) {
    const curentNode = this.map.get(key)
    this.list.removeCurrentNode(curentNode)
    this.list.insertWithDataKeyForward(0, curentNode)
    return this.map.get(key).data.value
  }
  return -1
}

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
Cache.prototype.put = function (key, value) {
  // 如果存在的就在双向链表移除，并且在头结点重新添加
  // 如果不存在就，并且capacity已经满了，删除最后一个节点，然后在头结点重写添加

  // 如果当前链表已经存在密钥，则删除该节点，在头部添加新节点
  if (this.map.has(key)) {
    const currentNode = this.map.get(key)
    this.list.removeCurrentNode(currentNode)
    this.list.insertWithDataKeyForward(0, new Node({ key, value }))
    this.map.get(key).data.value = value
  } else if (this.list.length < this.capacity) {
    // 如果节点长度没有比capacity多则直接在头结点添加新节点
    const newNode = new Node({ key, value })
    this.list.insertWithDataKeyForward(0, newNode)
    this.map.set(key, newNode)
  } else {
    // 节点长度和capacity一样长，删除尾节点，在头部添加新节点
    const newNode = new Node({ key, value })
    const lastNode = this.list.last.pre
    this.list.removeCurrentNode(lastNode)
    this.list.insertWithDataKeyForward(0, newNode)
    this.map.delete(lastNode.data.key)
    this.map.set(key, newNode)
  }
}

const cache = new Cache(2 /* 缓存容量 */)

cache.put(1, 1)
cache.put(2, 2)
console.log(cache.get(1)) // 返回  1
cache.put(3, 3) // 该操作会使得关键字 2 作废
console.log(cache.get(2)) // 返回 -1 (未找到)
cache.put(4, 4) // 该操作会使得关键字 1 作废
console.log(cache.get(1)) // 返回 -1 (未找到)
console.log(cache.get(3)) // 返回  3
console.log(cache.get(4)) // 返回  4
cache.put(3, 6)
console.log(cache.get(3)) // 返回  6

// const cache = new Cache(10 /* 缓存容量 */);

// cache.put(1, 1);
// cache.put(2, 2);
// console.log(cache.get(1));       // 返回  1
// cache.put(3, 3);    // 该操作会使得密钥 2 作废
// console.log(cache.get(2))       // 返回 -1 (未找到)
// cache.put(4, 4);    // 该操作会使得密钥 1 作废
// cache.put(5, 4);    // 该操作会使得密钥 1 作废
// cache.put(7, 4);    // 该操作会使得密钥 1 作废
// console.log(cache.get(1));       // 返回 -1 (未找到)
// console.log(cache.get(3));       // 返回  3
// console.log(cache.get(4));       // 返回  4
// console.log(cache.get(7));       // 返回  4
// console.log(cache.get(7));       // 返回  4
// console.log(cache.get(5));       // 返回  4
// console.log(cache.get(4));       // 返回  4

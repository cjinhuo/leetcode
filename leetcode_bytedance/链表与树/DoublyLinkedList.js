// 含有 头节点 && 尾节点 的双向链表

var NodeData = function ({ key = null, value = null }) {
  this.key = key
  this.value = value
}
var Node = function (data) {
  this.pre = null
  this.next = null
  this.data = new NodeData(data)
}
var DoublyLinkedList = function(){
  this.head = new Node({ key: 'null', value: 'null' })
  this.last = new Node({key:'null',value: 'null'})
  this.head.next = this.last
  this.last.pre = this.head
  this.length = 0
}

// 在从前往后在指定位置添加节点
DoublyLinkedList.prototype.insertWithDataKeyForward = function(position, node){
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
DoublyLinkedList.prototype.insert = function(preNode, currentNode) {
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
DoublyLinkedList.prototype.findPosition = function (node) {

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




const list = new DoublyLinkedList()
let node1 = new Node({ key: 1, value: 1 })
let node2 = new Node({ key: 2, value: 2 })
let node3 = new Node({ key: 3, value: 3})
list.insertWithDataKeyForward(0, node1)
list.insertWithDataKeyForward(1, node2)
list.insertWithDataKeyBackward(0, node4)
console.log(list.last.pre)
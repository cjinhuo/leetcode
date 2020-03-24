// 合并两个有序链表
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * 这是利用一个新的链表然后通过遍历两个链表的各个节点然后判断大小，最终合成一个新的链表
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  let index1 = l1
  let index2 = l2
  let list = new ListNode()
  let listIndex = list
  while(index1 !== null && index2 !== null) {
    if (index1.val <= index2.val) {
      listIndex.next = new ListNode(index1.val)
      listIndex = listIndex.next
      index1 = index1.next
    } else {
      listIndex.next = new ListNode(index2.val)
      listIndex = listIndex.next
      index2 = index2.next
    }
  }
  if (index2 !== null) {
    listIndex.next = index2
  } else {
    listIndex.next = index1
  }
  return list.next
};


// 回溯 
var recursiveMergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2
  } else if (l2 === null) {
    return l1
  } else if(l1.val < l2.val) {
    l1.next = recursiveMergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = recursiveMergeTwoLists(l1, l2.next)
    return l2
  }
}





function ListNode(val) {
  this.val = val;
  this.next = null;
}

const createList = (arr) => {
  let list = new ListNode()
  let index = list
  arr.forEach(value => {
    index.next = new ListNode(value)
    index = index.next
  })
  return list.next
}


const l1 = createList([1, 2, 4])
const l2 = createList([1, 3, 4])
// const result = mergeTwoLists(l1, l2)
const result = recursiveMergeTwoLists(l1, l2)
let header = result
while (header !== null) {
  console.log(header.val)
  header = header.next
}
console.log(result)
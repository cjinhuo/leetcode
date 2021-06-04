/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
const data = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 3,
      next: null,
    },
  },
}

var reverseList = function (head) {
  if (!head) return null
  let preNode = null
  let curNode = head
  while (curNode !== null) {
    // 保存前一个的node
    // 1 -> 2 -> 3 -> null
    // null <- 1 <- 2 <- 3
    let next = curNode.next
    curNode.next = preNode
    preNode = curNode
    curNode = next
  }
  return preNode
}

/**
 * 自己的思路：将所有的值都遍历出来，然后再倒着遍历一遍，有点浪费空间和时间
 * @param {ListNode} head
 * @return {ListNode}
 */
// var reverseList = function (head) {
//   const arr = []
//   const listToArr = headList => {
//     if (!headList) return arr
//     arr.push(headList.val)
//     if (headList.next) {
//       listToArr(headList.next)
//     }
//   }
//   listToArr(head)
//   let newHead = {
//     val: '',
//     next: null,
//   }
//   let cur = newHead
//   if (arr.length === 0) {
//     return null
//   }
//   newHead.val = arr[arr.length - 1]
//   for (let i = arr.length - 2; i >= 0; i--) {
//     cur.next = {
//       val: arr[i],
//       next: null,
//     }
//     cur = cur.next
//   }
//   return newHead
// }

reverseList(data)

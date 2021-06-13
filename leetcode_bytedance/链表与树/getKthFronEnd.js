/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
  let res = head
  let first = head
  while (k !== 0) {
    first = first.next
    k--
  }
  while (first) {
    first = first.next
    res = res.next
  }
  return res
}

function ListNode(val) {
  this.val = val
  this.next = null
}
const one = new ListNode(1)
const two = new ListNode(2)
const three = new ListNode(3)
const four = new ListNode(4)
one.next = two
two.next = three
three.next = four

console.log(getKthFromEnd(one, 2))

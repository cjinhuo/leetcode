/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  if (!head) {
    return false
  }
  let fast = head.next
  let slow = head
  while (slow !== fast) {
    if (!fast || !fast.next) {
      return false
    }
    fast = fast.next.next
    slow = slow.next
  }
  return true
}
function ListNode(val) {
  this.val = val
  this.next = null
}
const one = new ListNode(3)
const two = new ListNode(2)
const three = new ListNode(4)
const four = new ListNode(7)
one.next = two
two.next = three
three.next = four
four.next = three

console.log(hasCycle(one))

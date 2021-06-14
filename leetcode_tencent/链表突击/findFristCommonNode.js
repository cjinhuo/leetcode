/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
// 双指针法，为了保证两条单链表的长度一样，交叉相加，因为 a + b === b + a，然后从头开始一起向右走
function FindFirstCommonNode(pHead1, pHead2) {
  let t1 = pHead2,
    t2 = pHead1
  while (t1 != t2) {
    t1 = t1 ? t1.next : pHead1
    t2 = t2 ? t2.next : pHead2
  }
  return t1
}
module.exports = {
  FindFirstCommonNode: FindFirstCommonNode,
}

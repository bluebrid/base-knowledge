/**
 * https://leetcode-cn.com/problems/reverse-linked-list/
 * @param {*} head 
 * @returns 
 */
const ListNode = require("../工具/链表")
function reverse(head) {
  let prev = null
  let cur = head
  while (cur) {
    let next = cur.next
    cur.next = prev//这个地方是关键， 将上一个作为next 了

    prev = cur
    cur = next // 这个地方将cur进行取后面的
  }
  // 返回反转后的头节点
  return prev
}

let head = new ListNode(1)
head.next = new ListNode(2)
head.next.next = new ListNode(3)
head.next.next.next = new ListNode(4)
head.next.next.next.next = new ListNode(5)

 
console.log(reverse(head))
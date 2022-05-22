
const ListNode = require('./ListNode')
const { makeListNode } = require('./ListNode')
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
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

};

const nodes = makeListNode([1, 2, 3, 4, 5])
console.log(reverseList(nodes))

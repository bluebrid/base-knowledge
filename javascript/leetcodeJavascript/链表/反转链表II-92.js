/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

const ListNode = require("../工具/链表")
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */

var reverseBetween = function (head, left, right) {
  const dummyNode = new ListNode(-1);
  dummyNode.next = head;//虚拟头节点

  let pre = dummyNode;
  for (let i = 0; i < left - 1; i++) {//pre遍历到left的前一个节点
    pre = pre.next;
  }

  let rightNode = pre;
  for (let i = 0; i < right - left + 1; i++) {//rightNode遍历到right的位置
    rightNode = rightNode.next;
  }

  let leftNode = pre.next;//保存leftNode
  let curr = rightNode.next;//保存rightNode.next

  //切断left到right的子链
  pre.next = null;
  rightNode.next = null;

  //206题的逻辑 反转left到right的子链
  reverseLinkedList(leftNode);

  //返乡连接
  pre.next = rightNode;
  leftNode.next = curr;
  return dummyNode.next;
};

const reverseLinkedList = (head) => {
  let pre = null;
  let cur = head;

  while (cur) {
    const next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
}

let head = new ListNode(1)
head.next = new ListNode(2)
head.next.next = new ListNode(3)
head.next.next.next = new ListNode(4)
head.next.next.next.next = new ListNode(5)

console.log(JSON.stringify(reverseBetween(head, 2, 3)))

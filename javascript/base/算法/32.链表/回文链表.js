const Node = function (data) {
  this.data = data;
  this.next = null;
}
const node1 = new Node('A');
const node2 = new Node('B');
const node3 = new Node('C');
const node4 = new Node('F');
const node5 = new Node('B');
const node6 = new Node('A');
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;
node5.next = node6;
/**
 * 判断是否是回文链表， 其实也就是类似于是否回文字符串ABCCBA
 * @param {*} head 
 */
 function reverse(head) {
  let prev = null
  let cur = head
  while (cur) {
    let next = cur.next
    cur.next = prev//这个地方是关键， 将上一个作为next 了 （这个地方断开指针）

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

/**
 * 这个其实只是判断值是否是一个回文
 * @param {*} head 
 * @returns 
 */
const isPalindrome1 = head => {
  let a = '', b = '';
  while(head !== null) {
      a = a + head.data;
      b = head.data + b;
      head = head.next;
  }
  return a === b;
}


const isPalindrome = head => {
  // 1. 先反转链表
  let reverse = head;
  let originHead = head;
  reverse.next = null
  while (originHead.next) {
    const head = head.next
    reverse = head.next = reverse
  }
  // 2. 再进行对比
  while (reverse && originHead) {
    if (originHead !== reverse) {
      return false
    }
    originHead = originHead.next;
    reverse = reverse.next;
  }
  return true;

}
console.log(isPalindrome(node1));
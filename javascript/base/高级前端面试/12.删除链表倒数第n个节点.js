const { makeListNode } = require('./ListNode')
const ListNode = require('./ListNode')
const list = makeListNode([1, 2])
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    // 快慢指针，
    let fast = head, slow = head
    while(n) {
        fast = fast.next;
        n--
    }
    while(fast && fast.next) {
        fast = fast.next
        slow = slow.next
        
    }
    slow.next = slow.next.next;
    return head
};

console.log(removeNthFromEnd(list, 2))
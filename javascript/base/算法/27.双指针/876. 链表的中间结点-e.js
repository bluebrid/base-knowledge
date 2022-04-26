/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * 给定一个头结点为 head 的非空单链表，返回链表的中间结点。
 * 如果有两个中间结点，则返回第二个中间结点。
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
    // 所谓的慢指针，是因为快指针，
    // 每次走的都是慢指针的两倍， 那就是快指针到达终点，
    // 慢指针才走了一半，也就是中间节点
    slow = fast = head;
    while (fast && fast.next) {//快慢指针遍历，直到快指针到达最后
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
};
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * 给你两个单链表的头节点 headA 和 headB ，
 * 请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
    const visited = new Set();
    let temp = headA;
    while (temp !== null) {//将链表A存入set中
        visited.add(temp);
        temp = temp.next;
    }
    temp = headB;
    while (temp !== null) {
        if (visited.has(temp)) {//第一个相同的节点就是重合的节点
            return temp;
        }
        temp = temp.next;
    }
    return null;
};
// 双指针
var getIntersectionNode = function(headA, headB) {
    if (headA === null || headB === null) {
        return null;
    }
    let pA = headA, pB = headB;
    while (pA !== pB) { // 这个是关键
        pA = pA === null ? headB : pA.next;//链表A循环结束就循环链表B	
        pB = pB === null ? headA : pB.next;//链表A循环结束就循环链表B	
    }
    return pA;//当pA == pB时就是交点
};

/**
 * 给定一个链表的头节点  head ，
 * 返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
 * @param {*} head 
 * @returns 
 */
var detectCycle = function (head) {
    const visited = new Set();
    while (head !== null) {//终止条件，如果没有环 跳出循环
        if (visited.has(head)) {//如果存在重复的节点，这个节点就是入环节点
            return head; // 返回指定的节点
        }
        visited.add(head);//将节点加入set中
        head = head.next;
    }
    return null;
};
/**
 * 快慢指针
 * @param {*} head 
 * @returns 
 */
var detectCycle = function (head) {
    if (head === null) {
        return null;
    }
    let slow = head, fast = head;
    while (fast !== null) {
        slow = slow.next;//慢指针移动两步，快指针移动一步
        if (fast.next !== null) {
            fast = fast.next.next;
        } else {
            return null;//如果没有环 之间返回null
        }
        if (fast === slow) {//有环
            let fast = head;
            //快指针指向头节点，然后每次快慢指针各走一步直到相遇，相遇的节点就是入环节点
            while (fast !== slow) {
                fast = fast.next;
                slow = slow.next;
            }
            return fast;
        }
    }
    return null;
};
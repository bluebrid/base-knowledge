/**
 * 给你一个链表的头节点 head ，判断链表中是否有环。
 * @param {*} head 
 * @returns 
 */
var hasCycle = (head) => {
    let map = new Map();
    while (head) {
        if (map.has(head)) return true;//如果当前节点在map中存在就说明有环
        map.set(head, true);//否则就加入map
        head = head.next;//迭代节点
    }
    return false;//循环完成发现没有重复节点，说明没环
};
/**
 * 准备两个指针fast和slow，循环链表，slow指针初始也指向head，每次循环向前走一步，fast指针初始指向head，
 * 每次循环向前两步，
 * 如果没有环，则快指针会抵达终点，如果有环，那么快指针会追上慢指针
 * 
 * @param {*} head 
 * @returns 
 */
var hasCycle = function (head) {
    //设置快慢指针
    let slow = head;
    let fast = head;
    //如果没有环，则快指针会抵达终点，否则继续移动双指针
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        //快慢指针相遇，说明含有环
        if (slow == fast) {
            return true;
        }
    }

    return false;
};
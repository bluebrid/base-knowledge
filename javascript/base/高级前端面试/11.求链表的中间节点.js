const { makeListNode } = require('./ListNode')
const list = makeListNode([1, 2, 4, 6, 9])
const mid = (l) => {
    let val
    let fast = l, slow = l
    while (slow.next && fast.next) {
        slow = slow.next
        fast = fast.next.next
        val = slow
    }
    return val.val
}


console.log(mid(list))
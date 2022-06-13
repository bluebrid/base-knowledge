const { makeListNode } = require('./ListNode')
const mergeTwoLists = (l1, l2) => {
    if (!l1) {
        return l2
    }
    if (!l2) {
        return l1
    }
    if (l1.val > l2.val) {
        l2.next = mergeTwoLists(l2.next, l1)
        return l2
    } else {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1
    }
}

const list1 = makeListNode([1, 2, 4]), list2 = makeListNode([1, 3, 4])
console.log(mergeTwoLists(list1, list2))
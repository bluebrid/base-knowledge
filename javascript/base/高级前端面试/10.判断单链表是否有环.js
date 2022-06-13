const { makeListNode } = require('./ListNode')
const hasCycle = (l) => {
    let set = new Set();
    while (l) {
        if (set.has(l.val)) {
            return true
        }
        set.add(l.val)
        l = l.next
    }
    return false
}

const list = makeListNode([1, 2, 4, 6, 9])
console.log(hasCycle(list))
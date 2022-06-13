const { makeListNode } = require('./ListNode')
const getIntersectionNode = (headA, headB) => {
    let pA = headA,pB = headB;
    while(pA || pB) {
        if (pA?.val === pB?.val) return pA
        pA = pA === null ? headB : pA.next
        pB = pB === null ? headA: pB.next
    }
    return null;
    
}

let l1 = makeListNode([0, 9, 1, 2, 4]), l2 = makeListNode([3, 2, 4])
console.log(getIntersectionNode(l1, l2))
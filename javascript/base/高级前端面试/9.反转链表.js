const { makeListNode } = require('./ListNode')
const reverse = (head) => {
   if (!head || !head.next) return head;
   let pre = null, curr = head
    while (curr) {
        const next = curr.next;
        curr.next = pre
        pre = curr 
        curr = next   
    }

    return pre
}

const list = makeListNode([1, 2, 4, 6, 9])
console.log(reverse(list))
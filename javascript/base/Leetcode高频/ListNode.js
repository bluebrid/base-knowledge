<<<<<<< HEAD
function ListNode(val) {
  this.val = val
  this.next = null
}

/**
 * 数组 -> 链表
 * @param {number[]} vals
 */
function makeListNode(vals) {
  let head = new ListNode(vals[0])
  let i = 1
  let cur = head
  while (i < vals.length) {
    let val = vals[i]
    cur.next = new ListNode(val)
    cur = cur.next
    i++
  }
  return head
}

module.exports = ListNode

module.exports.makeListNode = makeListNode
=======
function ListNode(val) {
  this.val = val
  this.next = null
}

/**
 * 数组 -> 链表
 * @param {number[]} vals
 */
function makeListNode(vals) {
  let head = new ListNode(vals[0])
  let i = 1
  let cur = head
  while (i < vals.length) {
    let val = vals[i]
    cur.next = new ListNode(val)
    cur = cur.next
    i++
  }
  return head
}

module.exports = ListNode

module.exports.makeListNode = makeListNode
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d

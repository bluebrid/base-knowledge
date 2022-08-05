<<<<<<< HEAD
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
const ListNode = require('./ListNode')
const { makeListNode } = require('./ListNode')
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
 var mergeTwoLists = function(l1, l2) {
  if (l1 === null) {
      return l2;
  } else if (l2 === null) {
      return l1;
  } else if (l1.val < l2.val) {
      l1.next = mergeTwoLists(l1.next, l2);
      return l1;
  } else {
      l2.next = mergeTwoLists(l1, l2.next);
      return l2;
  }
};
const l1 = makeListNode([1, 2, 4]), l2 = makeListNode([1, 3, 4])
=======
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
const ListNode = require('./ListNode')
const { makeListNode } = require('./ListNode')
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
 var mergeTwoLists = function(l1, l2) {
  if (l1 === null) {
      return l2;
  } else if (l2 === null) {
      return l1;
  } else if (l1.val < l2.val) {
      l1.next = mergeTwoLists(l1.next, l2);
      return l1;
  } else {
      l2.next = mergeTwoLists(l1, l2.next);
      return l2;
  }
};
const l1 = makeListNode([1, 2, 4]), l2 = makeListNode([1, 3, 4])
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(mergeTwoLists(l1, l2))
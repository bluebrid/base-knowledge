/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
let TreeNode = require('./二叉树.js')
/**
/**
* 给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 
* （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
* @param {TreeNode} root
* @return {number[][]}
*/
const levelOrderBottom = (root) => {
  if (!root) {
    return null
  }
  let queue = [root]
  let result = []
  while (queue.length) {
    const size = queue.length;
    const tempRes = [];
    for (let i = 0; i < size; i++) {
      const current = queue.shift(); // 一个个的消费，而且只消费当前层， 因为是先进先出
      tempRes.push(current.val)
      if (current.left) {
        queue.push(current.left) // 后面进入的不会被消费
      }
      if (current.right) {
        queue.push(current.right)
      }
    }
    result.push(tempRes)

  }
  return result
}

var t = new TreeNode(3)
t.left = new TreeNode(9)
t.right = new TreeNode(20)
t.left.left = new TreeNode(7)
t.left.right = new TreeNode(8)
t.right.left = new TreeNode(15)
t.right.right = new TreeNode(7)

console.log(JSON.stringify(levelOrderBottom(t)))
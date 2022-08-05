<<<<<<< HEAD
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
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return false;
  const help = (left, right) => {
    if (left === null && right === null) {
      return true
    }
    if (left === null || right === null) {
      return false;
    }
    if (left.val !== right.val) {
      return false;
    }
    return help(left.left, right.left) && help(left.right, right.right)
  }
  return help(root.left, root.right)
};

var t = new TreeNode(3)
t.left = new TreeNode(1)
t.left.left = new TreeNode(11)
t.left.right = new TreeNode(11)
t.right = new TreeNode(1)
=======
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
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return false;
  const help = (left, right) => {
    if (left === null && right === null) {
      return true
    }
    if (left === null || right === null) {
      return false;
    }
    if (left.val !== right.val) {
      return false;
    }
    return help(left.left, right.left) && help(left.right, right.right)
  }
  return help(root.left, root.right)
};

var t = new TreeNode(3)
t.left = new TreeNode(1)
t.left.left = new TreeNode(11)
t.left.right = new TreeNode(11)
t.right = new TreeNode(1)
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(isSymmetric(t))
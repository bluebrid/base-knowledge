/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
// 给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
// 
let TreeNode = require('../工具/二叉树.js')

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  let res = []
  let dfs = (node, level = 0) => {
      if (!node) return

      if (!res[level]) {
          res[level] = []
      }

      dfs(node.left, level + 1)
      dfs(node.right, level + 1)

      res[level].push(node.val)
  }

  dfs(root)
  return res.reverse()
};

var t = new TreeNode(3)
t.left = new TreeNode(9)
t.right = new TreeNode(20)
t.right.left = new TreeNode(15)
t.right.right = new TreeNode(7)

console.log(levelOrderBottom(t))
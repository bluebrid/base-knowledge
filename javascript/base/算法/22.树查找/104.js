let TreeNode = require('./二叉树.js')
/**
 * 给定一个二叉树，找出其最大深度。
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 * @param {TreeNode} root
 * @return {number}
 */
// 深度优先遍历
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }
  let arr = [];
  let max = 0;
  let helper = (root, result) => {
    if (!root) {
      max = Math.max(max, result)
      return max;
    }
    result++
    return Math.max(helper(root.left, result), helper(root.right, result))
  }
  const left = helper(root.left, 0)
  const right = helper(root.right, 0)
  return Math.max(left, right)
  // arr.sort((a, b) => a - b)
  // console.log(arr)
  // return arr[arr.length - 1]

};

var t = new TreeNode(3)
t.left = new TreeNode(9)
t.right = new TreeNode(20)
t.left.left = new TreeNode(7)
t.left.right = new TreeNode(8)
t.right.left = new TreeNode(15)
t.right.right = new TreeNode(7)
t.right.right.right = new TreeNode(3)
t.right.right.right.right = new TreeNode(3)
console.log(maxDepth(t))
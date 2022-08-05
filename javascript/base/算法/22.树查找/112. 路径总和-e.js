<<<<<<< HEAD
let TreeNode = require('./二叉树.js')
/**
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。
 * 判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。
 * 如果存在，返回 true ；否则，返回 false 。
 * @param {*} root 
 * @param {*} sum 
 * @returns 
 */
let hasPathSum = function (root, sum) {
  if (!root) {
    return false
  }
  // 叶子节点 判断当前的值是否等于 sum 即可
  if (!root.left && !root.right) {
    return root.val === sum
  }

  return (
    hasPathSum(root.left, sum - root.val) || // 自减
    hasPathSum(root.right, sum - root.val) // 左右节点，任意满足条件都可以
  )
}

var t = new TreeNode(5)
t.left = new TreeNode(4)
t.right = new TreeNode(8)
t.left.left = new TreeNode(11)
t.left.left.left = new TreeNode(7)
t.left.left.right = new TreeNode(2)

t.right.left = new TreeNode(13)
t.right.right = new TreeNode(4)
t.right.right.right = new TreeNode(1)
console.log(hasPathSum(t, 22))
=======
let TreeNode = require('./二叉树.js')
/**
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。
 * 判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。
 * 如果存在，返回 true ；否则，返回 false 。
 * @param {*} root 
 * @param {*} sum 
 * @returns 
 */
let hasPathSum = function (root, sum) {
  if (!root) {
    return false
  }
  // 叶子节点 判断当前的值是否等于 sum 即可
  if (!root.left && !root.right) {
    return root.val === sum
  }

  return (
    hasPathSum(root.left, sum - root.val) || // 自减
    hasPathSum(root.right, sum - root.val) // 左右节点，任意满足条件都可以
  )
}

var t = new TreeNode(5)
t.left = new TreeNode(4)
t.right = new TreeNode(8)
t.left.left = new TreeNode(11)
t.left.left.left = new TreeNode(7)
t.left.left.right = new TreeNode(2)

t.right.left = new TreeNode(13)
t.right.right = new TreeNode(4)
t.right.right.right = new TreeNode(1)
console.log(hasPathSum(t, 22))
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(hasPathSum(t, 9))
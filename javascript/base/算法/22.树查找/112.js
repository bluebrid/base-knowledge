<<<<<<< HEAD
let TreeNode = require('./二叉树.js')
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (!root) {
    return false;
  }
  if (!root.left && !root.right) {
    return root.val === targetSum
  }
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
};

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
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (!root) {
    return false;
  }
  if (!root.left && !root.right) {
    return root.val === targetSum
  }
  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
};

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
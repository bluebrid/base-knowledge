<<<<<<< HEAD
let TreeNode = require('./二叉树.js')
/**
 * 给定一个二叉树，找出其最大深度。
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0
  const left = maxDepth(root.left);//递归左子树
  const right = maxDepth(root.right);//递归右子树
  return Math.max(left, right) + 1;//1加左节点和有节点深度的较大者
};

var t = new TreeNode(3)
t.left = new TreeNode(9)
t.right = new TreeNode(20)
t.left.left = new TreeNode(7)
t.left.right = new TreeNode(8)
t.right.left = new TreeNode(15)
t.right.right = new TreeNode(7)
t.right.right.right = new TreeNode(3)
=======
let TreeNode = require('./二叉树.js')
/**
 * 给定一个二叉树，找出其最大深度。
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  if (!root) return 0
  const left = maxDepth(root.left);//递归左子树
  const right = maxDepth(root.right);//递归右子树
  return Math.max(left, right) + 1;//1加左节点和有节点深度的较大者
};

var t = new TreeNode(3)
t.left = new TreeNode(9)
t.right = new TreeNode(20)
t.left.left = new TreeNode(7)
t.left.right = new TreeNode(8)
t.right.left = new TreeNode(15)
t.right.right = new TreeNode(7)
t.right.right.right = new TreeNode(3)
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(maxDepth(t))
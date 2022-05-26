let TreeNode = require('./二叉树.js')
/**
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
 * 
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (!root) {
    return root
  }
  if (root.val > p.val && root.val < q.val) {
    return root
  }
  if (root.val > p.val && root.val > q.val) {
    return lowestCommonAncestor(root.left, p, q)
  }
  if (root.val < p.val && root.val < q.val) {
    return lowestCommonAncestor(root.right, p, q)
  }
  return root;
};

var t = new TreeNode(5)
t.left = new TreeNode(4)
t.right = new TreeNode(8)
t.left.left = new TreeNode(2)
t.left.left.left = new TreeNode(1)
t.left.left.right = new TreeNode(2)

t.right.left = new TreeNode(13)
t.right.right = new TreeNode(4)
t.right.right.right = new TreeNode(1)

var l = new TreeNode(7)
var r = new TreeNode(8)
console.log(lowestCommonAncestor(t, l, r))
// 公共祖先， 就是， left<root root > right 的第一个值
// 如果不满足， 那就继续左右进行递归查询

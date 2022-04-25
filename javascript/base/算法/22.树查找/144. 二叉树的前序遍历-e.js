/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var preorderTraversal = function(root, res=[]) {
  if(!root) return res;
  res.push(root.val)
  preorderTraversal(root.left, res)
  preorderTraversal(root.right, res)
  return res
};
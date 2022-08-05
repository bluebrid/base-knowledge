var inorderTraversal = function(root, res=[]) {
  if(!root) return res;
  inorderTraversal(root.left, res)
  res.push(root.val)
  inorderTraversal(root.right, res)
  return res
};
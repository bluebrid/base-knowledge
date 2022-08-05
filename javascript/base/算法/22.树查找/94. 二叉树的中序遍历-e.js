<<<<<<< HEAD
var inorderTraversal = function(root, res=[]) {
  if(!root) return res;
  inorderTraversal(root.left, res)
  res.push(root.val)
  inorderTraversal(root.right, res)
  return res
=======
var inorderTraversal = function(root, res=[]) {
  if(!root) return res;
  inorderTraversal(root.left, res)
  res.push(root.val)
  inorderTraversal(root.right, res)
  return res
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
};
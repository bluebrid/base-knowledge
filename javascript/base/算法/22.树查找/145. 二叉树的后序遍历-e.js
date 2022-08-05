<<<<<<< HEAD
var postorderTraversal = function(root, res=[]) {
  if (!root) return res
  postorderTraversal(root.left, res)
  postorderTraversal(root.right, res)
  res.push(root.val)
  return res
=======
var postorderTraversal = function(root, res=[]) {
  if (!root) return res
  postorderTraversal(root.left, res)
  postorderTraversal(root.right, res)
  res.push(root.val)
  return res
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
};
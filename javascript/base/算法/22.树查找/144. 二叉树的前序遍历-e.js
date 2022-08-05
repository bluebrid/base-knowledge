<<<<<<< HEAD
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
=======
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
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
};
<<<<<<< HEAD
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (!root) return root;
  if (root.val > p.val && root.val < q.val) {
    return root;
  }
  if (root.val > p.val && root.val > q.val) {
    let left = lowestCommonAncestor(root.left, p, q)
    return left !== null && left
  }
  if (root.val < p.val && root.val < q.val) {
    let right = lowestCommonAncestor(root.right, p, q)
    return right != null && right
  }
  return root;
=======
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (!root) return root;
  if (root.val > p.val && root.val < q.val) {
    return root;
  }
  if (root.val > p.val && root.val > q.val) {
    let left = lowestCommonAncestor(root.left, p, q)
    return left !== null && left
  }
  if (root.val < p.val && root.val < q.val) {
    let right = lowestCommonAncestor(root.right, p, q)
    return right != null && right
  }
  return root;
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
};
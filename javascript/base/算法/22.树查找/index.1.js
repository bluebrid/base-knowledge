// 根据ID查询tree节点是否有该ID的节点
// 方法1.递归

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}
/**
 *        1
 *      2   3
 *    4   5
 *   6
 * 
 * 
 */

const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)
root.left.left.left = new TreeNode(6)

//前序遍历:
var preorderTraversal = function (root, res = []) {
  if (!root) return res;
  res.push(root.val);
  preorderTraversal(root.left, res)
  preorderTraversal(root.right, res)
  return res;
};
// 1 2 3 4 3 5
console.log(preorderTraversal(root))
//中序遍历:
var inorderTraversal = function (root, res = []) {
  if (!root) return res;
  inorderTraversal(root.left, res); // 这里是会先遍历到做根部的左节点， 然后往上
  res.push(root.val);
  inorderTraversal(root.right, res);
  return res;
};
console.log(inorderTraversal(root))
//后序遍历:
var postorderTraversal = function (root, res = []) {
  if (!root) return res;
  postorderTraversal(root.left, res);
  postorderTraversal(root.right, res);
  res.push(root.val);
  return res;
};
console.log(postorderTraversal(root))


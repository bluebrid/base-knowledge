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
// 时间复杂度O(n),n为节点个树，空间复杂度O(n)，显示栈的空间开销

// 前序遍历：中左右
// 压栈顺序：右左中
var preorderTraversal = function (root, res = []) {
  const stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    const node = stack.pop(); // 将当前的删除
    if (node) {
      res.push(node.val);
      if (node.right) stack.push(node.right); // 将右边的，添加进队列第一个
      if (node.left) stack.push(node.left); // 将左边的添加进队列第二个
    }
  };
  return res;
};
console.log(preorderTraversal(root))

//  中序遍历：左中右
//  压栈顺序：右中左
var inorderTraversal = function (root, res = []) {
  const stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    if (!node) {
      res.push(stack.pop().val);
      continue;
    }
    if (node.right) stack.push(node.right); // 右
    stack.push(node); // 中
    stack.push(null);
    if (node.left) stack.push(node.left); // 左
  };
  return res;
};

console.log(inorderTraversal(root))
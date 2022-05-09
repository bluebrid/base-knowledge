
let TreeNode = require('./二叉树.js')
/**
 * BFS
 * 给定一个二叉树，找出其最小深度。
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
  if (!root) {
    return 0
  }
  let queue = [root]
  let ans = 1;
  while (queue.length) {
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      const curr = queue.shift();
      if (!curr.left && !curr.right) {
        return ans
      }
      if (curr.left) {
        queue.push(curr.left)
      }
      if (curr.right) {
        queue.push(curr.right)
      }
    }
    ans++
  }
  return ans
};

var t = new TreeNode(3)
t.left = new TreeNode(9)
t.right = new TreeNode(20)
t.left.left = new TreeNode(7)
t.left.right = new TreeNode(8)
t.right.left = new TreeNode(15)
t.right.right = new TreeNode(7)

console.log(minDepth(t))
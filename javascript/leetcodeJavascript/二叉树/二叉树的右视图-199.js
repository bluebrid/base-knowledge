let TreeNode = require('../工具/二叉树.js')
let rightSideView1 = function (root) {
  if (!root) return []
  let queue = [root]
  let res = []
  while (queue.length) {
    let len = queue.length
    let last
    for (let i = 0; i < len; i++) {
      let node = queue.shift()
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
      if (node.val !== undefined) {
        last = node.val
      }
    }
    res.push(last)
  }
  return res
}

var rightSideView = function (root) {
  if (!root) return []
  let res = []
  while (root.right) {
    res.push(root.val)
    root = root.right
  }
  res.push(root.val)
  return res
};

// var t = new TreeNode(3)
// t.left = new TreeNode(9)
// t.right = new TreeNode(20)
// t.right.left = new TreeNode(15)
// t.right.right = new TreeNode(7)

var t = new TreeNode(1)
t.left = new TreeNode(2)
// t.right = new TreeNode(20)
// t.right.left = new TreeNode(15)
// t.right.right = new TreeNode(7)


console.log(rightSideView1(t))
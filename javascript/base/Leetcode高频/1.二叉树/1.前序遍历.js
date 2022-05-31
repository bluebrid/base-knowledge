let TreeNode = require('../二叉树.js')
var t = new TreeNode(3)
t.left = new TreeNode(9)
t.right = new TreeNode(20)
t.left.left = new TreeNode(7)
t.left.right = new TreeNode(8)
t.right.left = new TreeNode(15)
t.right.right = new TreeNode(7)
t.right.right.right = new TreeNode(3)


/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root, res = []) {
    if(!root) return res;
    res.push(root.val)
    preorderTraversal(root.left, res)
    preorderTraversal(root.right, res)
    return res
};

console.log(preorderTraversal(t))
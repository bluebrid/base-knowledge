let TreeNode = require('../二叉树.js')
var t = new TreeNode('A')
t.left = new TreeNode('B')
t.right = new TreeNode('C')
t.left.left = new TreeNode('D')
t.left.right = new TreeNode('E')
t.right.right = new TreeNode('F')


/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var midorderTraversal = function (root, res = []) {
    if(!root) return res;
    midorderTraversal(root.left, res)
    res.push(root.val)
    midorderTraversal(root.right, res)
    return res
};

console.log(midorderTraversal(t))
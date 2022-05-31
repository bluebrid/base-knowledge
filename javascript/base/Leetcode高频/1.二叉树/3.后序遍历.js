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
var afterorderTraversal = function (root, res = []) {
    if(!root) return res;
    afterorderTraversal(root.left, res)
    afterorderTraversal(root.right, res)
    res.push(root.val)
    return res
};

console.log(afterorderTraversal(t))
let TreeNode = require('../二叉树.js')
var t = new TreeNode('A')
t.left = new TreeNode('B')
t.right = new TreeNode('C')
t.left.left = new TreeNode('D')
t.left.left.left = new TreeNode('D')
t.left.left.left.left = new TreeNode('D')
t.left.right = new TreeNode('E')
t.right.right = new TreeNode('F')
const maxDepth = (root) => {
    if (!root) return 0;
    let max = 0;
    const helper =(root, res) => {
        if (!root) return 
        if (root){
            res++
            max = Math.max(res, max)
        }
        helper(root.left, res) 
        helper(root.right, res)
        
    }
    helper(root, 0)
    return max

}

console.log(maxDepth(t))
let TreeNode = require('../二叉树.js')
var t = new TreeNode('A')
t.left = new TreeNode('B')
t.right = new TreeNode('C')
t.left.left = new TreeNode('D')
t.left.right = new TreeNode('E')
t.right.right = new TreeNode('F')

var t1 = new TreeNode(1)
t1.left = new TreeNode(2)
t1.right = new TreeNode(2)
t1.left.left = new TreeNode(3)
t1.left.right = new TreeNode(4)
t1.right.left = new TreeNode(3)
t1.right.right = new TreeNode(4)


function isSame (root) {
    if (!root) {
        return true
    }
    if (root.left.val !== root.right.val) return false
    const helper = (left, right) => {
        if(!left && !right) return true
        if (left &!right || right && !left) return false;
        if(left.left?.val !== right.left?.val) return false
        if (left.right?.val !== right.right?.val) return false;
        return  helper(left.left,right.left) && helper(left.right, right.right)
    }
   
    return helper(root.left, root.right)
}
console.log(isSame(t1))
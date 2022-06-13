const TreeNode = require('./二叉树')
var buildTree = (preorder, inorder) => {
    if (!preorder.length) return null
    const node = new TreeNode(preorder[0])
    const index = inorder.indexOf(preorder[0])
    const inLeft = inorder.slice(0, index)
    const inRight = inorder.slice(index + 1)
    const preLeft = preorder.slice(1, index + 1)
    const preRight = preorder.slice(index + 1)
    node.left = buildTree(preLeft, inLeft)
    node.right = buildTree(preRight, inRight)
    return node
}
const preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
console.log(JSON.stringify(buildTree(preorder, inorder)))
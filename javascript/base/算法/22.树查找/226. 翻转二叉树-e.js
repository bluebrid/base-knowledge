/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 给你一棵二叉树的根节点 root ，翻转这棵二叉树，并返回其根节点。
 * @param {TreeNode} root
 * @return {TreeNode}
 */
 var invertTree = function(root) {
    if (root === null) {//递归终止条件
        return null;
    }
    const left = invertTree(root.left);//递归左子树
    const right = invertTree(root.right);//递归右子树
  	//交换左右节点
    root.left = right;
    root.right = left;
    return root;
};

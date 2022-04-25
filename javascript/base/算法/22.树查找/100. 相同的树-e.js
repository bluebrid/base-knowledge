/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 给你两棵二叉树的根节点 p 和 q ，编写一个函数来检验这两棵树是否相同。
 * 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
 var isSameTree = function(p, q) {
    if(p == null && q == null) //都是null表示相同
        return true;
    if(p == null || q == null) //只有一个是null表示不同
        return false;
    if(p.val != q.val) //节点的值不同
        return false;
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);//递归左右子树
};

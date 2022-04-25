/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 给你一个二叉树的根节点 root ， 检查它是否轴对称。
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
    if (!root) return true
    const isMirror = (l, r) => {
        if (!l && !r) return true; //两个空节点也为镜像
        if (
            l && r && l.val === r.val &&  //左节点和右节点相同，左子树和右子树也对称则返回true
            isMirror(l.left, r.right) &&
            isMirror(l.right, r.left)
        ) {
            return true;
        }
        return false;
    }
    return isMirror(root.left, root.right)
};
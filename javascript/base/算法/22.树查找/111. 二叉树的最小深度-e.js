/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 给定一个二叉树，找出其最小深度。
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function (root) {
    if (root == null) {
        return 0;
    }
    if (root.left == null && root.right == null) {//遍历到叶子结点终止
        return 1;
    }
    let ans = Number.MAX_SAFE_INTEGER;
    if (root.left != null) {
        ans = Math.min(minDepth(root.left), ans);//递归左子树，找到左子树的最小深度
    }
    if (root.right != null) {
        ans = Math.min(minDepth(root.right), ans);//递归右子树，找到右子树的最小深度
    }
    return ans + 1;//最小深度等于左右子树最小深度+1
};

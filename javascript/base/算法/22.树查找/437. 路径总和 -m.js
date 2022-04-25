/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 给定一个二叉树的根节点 root ，和一个整数 targetSum ，
 * 求该二叉树里节点值之和等于 targetSum 的 路径 的数目。
 * 路径 不需要从根节点开始，也不需要在叶子节点结束，
 * 但是路径方向必须是向下的（只能从父节点到子节点）。
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
    if (root == null) {
        return 0;
    }

    let ret = rootSum(root, targetSum);//以root为根节点的树中寻找路径
    ret += pathSum(root.left, targetSum);//递归左子树，在左子树中寻找路径
    ret += pathSum(root.right, targetSum);//递归右子树，在左子树中寻找路径
    return ret;
};

const rootSum = (root, targetSum) => {
    let ret = 0;

    if (root == null) {
        return 0;
    }
    const val = root.val;
    if (val === targetSum) {
        ret++;
    }

    //以root.left为根节点，targetSum - val为寻找的路径和，继续寻找路径
    ret += rootSum(root.left, targetSum - val);
    //以root.right为根节点，targetSum - val为寻找的路径和，继续寻找路径
    ret += rootSum(root.right, targetSum - val);
    return ret;
}
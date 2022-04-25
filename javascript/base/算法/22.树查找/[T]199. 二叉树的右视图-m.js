/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 给定一个二叉树的 根节点 root，想象自己站在它的右侧，
 * 按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
    function dfs(root, step, res) {//传入根节点 层数 右视的节点的数组
        if (root) {
            if (res.length === step) {
                res.push(root.val); //当res长度和step相等时 当前节点就是这一层的右节点 加入数组中
            }
            dfs(root.right, step + 1, res); //先递归右节点 让它在下一层先被处理
            dfs(root.left, step + 1, res);
        }
    }
    if (!root) return [];
    let arr = [];
    dfs(root, 0, arr);
    return arr;
};
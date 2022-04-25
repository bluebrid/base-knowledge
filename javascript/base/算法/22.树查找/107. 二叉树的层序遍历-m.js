/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 给你二叉树的根节点 root ，返回其节点值 自底向上的层序遍历 。 
 * （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrderBottom = (root) => {
    if (root == null) {
        return [];
    }
    const queue = [];
    queue.push(root);
    const res = [];

    while (queue.length) {
        const subRes = [];
        const levelSize = queue.length;
        for (let i = 0; i < levelSize; i++) {
            const cur = queue.shift();
            subRes.push(cur.val);
            if (cur.left) {
                queue.push(cur.left);
            }
            if (cur.right) {
                queue.push(cur.right);
            }
        }
        res.unshift(subRes);//和102不一样的地方 推入res中的方向正好相反
    }
    return res;
}
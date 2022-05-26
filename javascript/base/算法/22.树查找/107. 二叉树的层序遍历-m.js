/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
 let TreeNode = require('./二叉树.js')
 /**
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
        // 取出上一次的长度， 后面push 的值不会受影响
        for (let i = 0; i < levelSize; i++) {
            //队列，先进先出
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

var t = new TreeNode(3)
t.left = new TreeNode(9)
t.right = new TreeNode(20)
t.left.left = new TreeNode(7)
t.left.right = new TreeNode(8)
t.right.left = new TreeNode(15)
t.right.right = new TreeNode(7)

console.log(JSON.stringify(levelOrderBottom(t)))
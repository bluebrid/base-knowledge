/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 给定一个二叉树，找出其最大深度。
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 * @param {TreeNode} root
 * @return {number}
 */
 let TreeNode = require('./二叉树.js')
// 深度优先遍历
 var maxDepth = function(root) {
    if(!root) {
        return 0;
    } else {
        const left = maxDepth(root.left);//递归左子树
        const right = maxDepth(root.right);//递归右子树
        return Math.max(left, right) + 1;//1加左节点和有节点深度的较大者
    }
};
// BFS
const maxDepth1 = (root) => {
    if (root == null) return 0;
    const queue = [root];
    let depth = 1;
    while (queue.length) {
        // 当前层的节点个数
        const levelSize = queue.length;          
        // 逐个让当前层的节点出列
        for (let i = 0; i < levelSize; i++) {    
            // 当前出列的节点
            const cur = queue.shift();            
            // 左右子节点入列
            if (cur.left) queue.push(cur.left);
            if (cur.right) queue.push(cur.right); 
        }
        // 当前层所有节点已经出列，如果队列不为空，说明有下一层节点，depth+1
        if (queue.length) depth++;
    }
    return depth;
};
var t = new TreeNode(3)
t.left = new TreeNode(9)
t.right = new TreeNode(20)
t.left.left = new TreeNode(7)
t.left.right = new TreeNode(8)
t.right.left = new TreeNode(15)
t.right.right = new TreeNode(7)
t.right.right.right = new TreeNode(3)
console.log(maxDepth(t))
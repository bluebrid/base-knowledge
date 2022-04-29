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
 * 给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径。
 * 叶子节点 是指没有子节点的节点。
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
    const paths = [];
    const dfs = (root, path) => {//传入递归的节点和路径数组
        if (root) {
            path += root.val.toString();//加入当前节点
            //叶子结点就将所有连接起来的节点字符串加入paths中 也就是其中一条路径
            if (root.left === null && root.right === null) {
                paths.push(path);
            } else {
                path += "->"; //不是叶子节点继续递归左右子树
                dfs(root.left, path);
                dfs(root.right, path);
            }
        }
    }
    dfs(root, "");
    return paths;
};
var t = new TreeNode(3)
t.left = new TreeNode(9)
t.right = new TreeNode(20)
t.left.left = new TreeNode(7)
t.left.right = new TreeNode(8)
t.right.left = new TreeNode(15)
t.right.right = new TreeNode(7)

console.log(binaryTreePaths(t))
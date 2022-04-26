/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
 * 
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
    // 1. 确定递归的函数
    const travelTree = function (root, p, q) {
        // 2. 确定递归终止条件
        if (root === null || root === p || root === q) {
            return root;
        }
        // 3. 确定递归单层逻辑
        let left = travelTree(root.left, p, q);
        let right = travelTree(root.right, p, q);
        //如果在某一个节点的左右子树都能找到p和q说明这个节点就是公共祖先
        if (left !== null && right !== null) {
            return root;
        }
        if (left === null) {//如果左子树没找到就说明p，q都在右子树
            return right;
        }
        return left;//如果右子树没找到就说明p，q都在左子树
    }
    return travelTree(root, p, q);//递归开始
};

var lowestCommonAncestor = function (root, p, q) {
    if (root === null) {//递归终止条件
        return root;
    }
    //如果root节点大于p并且大于q，说明p和q都在root的左子树
    if (root.val > p.val && root.val > q.val) {
        let left = lowestCommonAncestor(root.left, p, q);
        return left !== null && left;
    }
    //如果root节点小于p并且小于q，说明p和q都在root的右子树
    if (root.val < p.val && root.val < q.val) {
        let right = lowestCommonAncestor(root.right, p, q);
        return right !== null && right;
    }
    return root;//如果上述条件都不满足说明root就是公共祖先
};

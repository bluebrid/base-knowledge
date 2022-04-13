// 给定二叉搜索树的根结点 root，返回值位于范围 [low, high] 之间的所有结点的值的和。
var rangeSumBST = function(root, low, high) {
    if (!root) {
        return 0;
    }
    if (root.val > high) {
        // 跳过，继续递归 左边节点
        return rangeSumBST(root.left, low, high);
    }
    if (root.val < low) {
        // 跳过，继续递归 右边节点
        return rangeSumBST(root.right, low, high);
    }
    // 满足条件, 则将值 进行累加
    return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high);
};

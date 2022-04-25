/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * 给你二叉树的根节点 root ，返回其节点值的 层序遍历 。 
 * （即逐层地，从左到右访问所有节点）。
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    const ret = [];
    if (!root) {
        return ret;
    }

    const q = [];
    q.push(root);//初始队列
    while (q.length !== 0) {
        const currentLevelSize = q.length;//当前层节点的数量
        ret.push([]);//新的层推入数组
        for (let i = 1; i <= currentLevelSize; ++i) {//循环当前层的节点
            const node = q.shift();
            ret[ret.length - 1].push(node.val);//推入当前层的数组
            if (node.left) q.push(node.left);//检查左节点，存在左节点就继续加入队列
            if (node.right) q.push(node.right);//检查左右节点，存在右节点就继续加入队列
        }
    }

    return ret;
};

var levelOrder1 = function(root) {
    if(!root) return []
    let res = []
    dfs(root, 0, res)
    return res
};

function dfs(root, step, res){//每层透传当前节点，层数，和输出数组
  if(root){
    if(!res[step]) res[step] = []//初始化当前层数组
    res[step].push(root.val)//当前节点加入当前层数组
    dfs(root.left, step + 1, res)//step+1，递归左节点	
    dfs(root.right, step + 1, res)//step+1，递归右节点	
  }
}
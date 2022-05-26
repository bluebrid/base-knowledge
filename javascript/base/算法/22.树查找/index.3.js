// 验证释放时二叉搜索树，也就是左边一定比右边小
// 方法1.递归

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}
/**
 *        1
 *      2   3
 *    4   5
 *   6
 * 
 * 
 */

const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)
root.left.left.left = new TreeNode(6)

const helper = (root, lower, upper) => {
  if (root === null) {
      return true;
  }
  if (root.val <= lower || root.val >= upper) {//终止条件 不满足二叉搜索树的性质
      return false;
  }
  //递归左右子树
  return helper(root.left, lower, root.val) && helper(root.right, root.val, upper);
}
var isValidBST = function(root) {
  //定义low=-Infinity，让所有值都大于low
  //定义upper=Infinity，让所有值都小于upper
  return helper(root, -Infinity, Infinity);
};


// console.log(isValidBST(root))

/**
 *        10
 *      6   20
 *        17   28
 *    
 * 
 * 
 */

 const root1 = new TreeNode(10)
 root1.left = new TreeNode(6)
 root1.right = new TreeNode(20)
 root1.right.left = new TreeNode(17)
 root1.left.right = new TreeNode(28)
 console.log(isValidBST(root1))
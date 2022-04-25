
/**
 * 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
 * 1. 节点的左子树只包含 小于 当前节点的数。
 * 2. 节点的右子树只包含 大于 当前节点的数。
 * 3. 所有左子树和右子树自身必须也是二叉搜索树。
 * @param {*} root 
 * @returns 
 */
var isValidBST = function (root) {
  //定义low=-Infinity，让所有值都大于low
  //定义upper=Infinity，让所有值都小于upper
  return helper(root, -Infinity, Infinity);
};
var helper = (root, lower, upper) => {
  if (root === null) {
    return true
  }
  if (root.val <= lower || root.val >= upper) return false;
  return helper(root.left, lower, root.val) && helper(root.right, root.val, upper)
}
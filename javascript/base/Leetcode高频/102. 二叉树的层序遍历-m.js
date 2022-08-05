<<<<<<< HEAD
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const res = [];
  if (!root) {
    return res;
  }
  const temp = [root];
  while (temp.length) {
    let tempLen = temp.length; // 保存临时的长度
    let tempRes = []
    for (let i = 0; i < tempLen; i++) {
      const node = temp.shift(); // 消费掉的，移除掉
      if (node) {
        tempRes.push(node.val)
        temp.push(node.left)
        temp.push(node.right)
      }
    }
    if(tempRes.length) {
      res.push(tempRes)
    }
    
  }
  return res
=======
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const res = [];
  if (!root) {
    return res;
  }
  const temp = [root];
  while (temp.length) {
    let tempLen = temp.length; // 保存临时的长度
    let tempRes = []
    for (let i = 0; i < tempLen; i++) {
      const node = temp.shift(); // 消费掉的，移除掉
      if (node) {
        tempRes.push(node.val)
        temp.push(node.left)
        temp.push(node.right)
      }
    }
    if(tempRes.length) {
      res.push(tempRes)
    }
    
  }
  return res
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
};
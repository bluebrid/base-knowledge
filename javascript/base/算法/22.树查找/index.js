// 根据ID查询tree节点是否有该ID的节点
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

const findTreeByVal = (root, val) => {
  if (!root) {
    return false
  }
  const find = (tree) => {
    if (!tree) {
      return false
    }
    if (tree.val === val) {
      return true
    }
    const left = tree.left;
    const right = tree.right;
    const l = find(left)
    if (l) {
      return true
    }
    const r = find(right)
    if (r) {
      return true;
    }
    return false

  }
  return find(root)

}

const root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)
root.left.left.left = new TreeNode(6)

console.log(findTreeByVal(root, 2))
// 给你一个二叉树的根节点 root ，按 任意顺序 ，返回所有从根节点到叶子节点的路径。

// 叶子节点 是指没有子节点的节点。
let binaryTreePaths = function (root) {
  let res = []
  let dfs = (node, path = "") => {
    if (!node) {
      return
    }

    let newPath = path ? `${path}->${node.val}` : `${node.val}`
    if (!node.left && !node.right) {
      res.push(newPath)
    }

    dfs(node.left, newPath)
    dfs(node.right, newPath)
  }
  dfs(root)
  return res
}

## [树](https://mp.weixin.qq.com/s/pQ-YcY0KBezLNMPSMCoAmg)
1. 分类
   > 1. 无序树： 树中的任意节点之间没用顺序关系， 这种树称为无序树，也叫自由树
   > 2. 有序树： 树中任意节点的子结点之间有顺序关系，这种树称为有序树。
   > 3. 二叉树：每个节点最多含有两个子树的树称为二叉树。
   > 4. 满二叉树：叶节点除外的所有节点均含有两个子树的树被称为满二叉树。
   > 5. 完全二叉树：除最后一层外，所有层都是满节点，且最后一层缺右边连续节点的二叉树称为完全二叉树（堆就是一个完全二叉树）。
   > 6. 哈夫曼树（最优二叉树）：带权路径最短的二叉树称为哈夫曼树或最优二叉树。
![](https://mmbiz.qpic.cn/mmbiz_png/ndgH50E7pIoAvJlib4f4lvae67jul6t2Djpvxzps2lGoVk0IA4bFFQ1OCal46LnHuRMsu7Dvw7e1WzYkZyl0gtA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)
2. 深度遍历
   > 1. 先序遍历：A->B->D->E->C->F-G(根->Left->right)
   ```javascript
   const first = (root) => {
     let res = [];
     if (!root) {
       return res
     }
     const loop = (root, res) => {
       if(!root) {
         return res;
       }
        res.push(root.val)
        loop(root.left, res)
        loop(root.right, res)
        return res
     }
     return loop(root, res)
   }
   ```
  > 2. 中序遍历：为 D->B->E->A->F->C->G（左-根-右）（仅二叉树有中序遍历）。
  ```javascript
  var inorderTraversal = function (root, res = []) {
    if (!root) return res;
    inorderTraversal(root.left, res); // 这里是会先遍历到做根部的左节点， 然后往上
    res.push(root.val);
    inorderTraversal(root.right, res);
    return res;
  };
  ```
  > 3. 后序遍历: 为 D->E->B->F->G->C->A（左-右-根）。
    ```javascript
  var inorderTraversal = function (root, res = []) {
    if (!root) return res;
    postorderTraversal(root.left, res);
    postorderTraversal(root.right, res);
    res.push(root.val);
    return res;
  };

3. 广度优先遍历
   > 层序遍历：  A->B->C->D->E->F->G。
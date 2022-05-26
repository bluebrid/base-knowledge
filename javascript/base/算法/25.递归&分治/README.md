 https://xiaochen1024.com/courseware/60b4f11ab1aa91002eb53b18/61964285c1553b002e57bf1a

## 递归三要素
1. 递归函数和参数
2. 递归终止条件
3. 递归单层逻辑
```javascript
function recursion(level, param1, param2, ...) {
  //递归终止条件
  if (level > MAX_LEVEL) {
    // output result
    return;
  }

  //处理当前层
  process_data(level, data, ...);

  //进入下一层
  recursion(level + 1, p1, ...);

  //重置状态
  reverse_state(level);
}
```
## 分治
>分治会将大问题拆解成小问题，拆解到最小问题之后，开始不断合并结果，递归是分治实现的一种形式或者是分治实现的一部分，分治包括三分部分，分解、计算、合并。分治的场景很多，例如快速排序，归并排序。

```javascript
function divide_conquer(problem, param1, param2, ...){
  if(problem === null){
    // return result
  }

  //分割问题
  subproblem = split_problem(problem, data)

  //计算子问题
  subResult1 = divide_conquer(subproblem[0], p1, ...)
  subResult2 = divide_conquer(subproblem[1], p1, ...)
  subResult3 = divide_conquer(subproblem[2], p1, ...)
  ...

  result = process_resule(subResult1, subResult2, subResult3,...)
}
```
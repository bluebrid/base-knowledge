https://xiaochen1024.com/courseware/60b4f11ab1aa91002eb53b18/61964326c1553b002e57bf1b

## 剪枝

排除那些不符合条件的分支。提高程序的运行效率。

## 回溯
一层层递归， 尝试搜索答案
1. 找到答案，返回结果，尝试其他的分支
2. 找不到答案：返回上一级，尝试其他的分支
```javascript
result = [];
function backtrack (path, list) {
    if (满足条件) {
        result.push(path);
        return
    }
    
    for () {
        // 单层逻辑
        backtrack (path, list)
        // 撤销选择 重置状态
    }
}
```
/**
 * 给定两个整数 n 和 k，返回范围 [1, n] 中所有可能的 k 个数的组合。
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
    let res = [];
    const helper = (startIndex, path = []) => {
        if (path.length === k) {
            res.push([...path])// 拷贝一份数据，避免其他分支受影响
            return;
        }
        for (let i = startIndex; i <= n; i++) {
            path.push(i)
            helper(i + 1, path) //下一层递归
            path.pop() //剪枝
        }
    }
    helper(1, [])
    return res;

};
const n = 4, k = 2;
console.log(JSON.stringify(combine(n, k)))
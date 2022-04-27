// 思路：因为每次可以爬 1 或 2 个台阶，所以到第n阶台阶可以从第n-2或n-1上来，其实就是斐波那契的dp方程
var climbStairs = function (n) {
    const memo = [1, 2]
    for (let i = 2; i <= n; i++) {
        memo[i] = memo[i - 1] + memo[i - 2]
    }
    return memo[n - 1]
}
console.log(climbStairs(4))
// 1： 1
// 2: [1,1], [2]
// 3: [1,1,1], [1,2], [2, 1]
// 4: [1,1,1,1], [1,1,2], [2,1,1], [1,2,11], [2,2]
// 分析得出的结论是： memo[n] = memo[n-1]+ memo[n-2]
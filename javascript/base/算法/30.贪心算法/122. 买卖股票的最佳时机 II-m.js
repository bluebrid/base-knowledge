//空间压缩
var maxProfit = function (prices) {
    const n = prices.length;
    let dp0 = 0,
        dp1 = -prices[0];
    for (let i = 1; i < n; ++i) {
        let newDp0 = Math.max(dp0, dp1 + prices[i]);
        let newDp1 = Math.max(dp1, dp0 - prices[i]);
        dp0 = newDp0;
        dp1 = newDp1;
    }
    return dp0;
};
// 在每一天，你可能会决定购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以购买它，然后在 同一天 出售。
// 返回 你能获得的 最大 利润 。
// 贪心
// 思路：因为不限制交易次数，只要今天价格比昨天高，就交易，利润为正累加，
// 最后的和就是最大的利润，注意第一天是没有利润的，
// 这道题之所以可以用贪心是因为局部最优：收集每天的正利润，可以推导出，全局最优：求得最大利润。
var maxProfit1 = function (prices) {
    let ans = 0;
    let n = prices.length;
    for (let i = 1; i < n; ++i) {
        //今天价格和昨天的差值是否为正，如果为正累加进去，为负则加0
        ans += Math.max(0, prices[i] - prices[i - 1]);
    }
    return ans;
};

const prices = [7,1,5,3,6,4]
console.log(maxProfit(prices))
console.log(maxProfit1(prices))
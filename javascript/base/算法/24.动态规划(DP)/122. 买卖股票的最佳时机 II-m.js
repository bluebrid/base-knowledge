
// 在每一天，你可能会决定购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以购买它，然后在 同一天 出售。
// 返回 你能获得的 最大 利润 。
// 贪心
// 思路：因为不限制交易次数，只要今天价格比昨天高，就交易，利润为正累加，
// 最后的和就是最大的利润，注意第一天是没有利润的，
// 这道题之所以可以用贪心是因为局部最优：收集每天的正利润，可以推导出，全局最优：求得最大利润。
function maxProfit(prices) {
    let minPrice = 0;
    let maxProfit = 0;

    prices.forEach((price, index) => {
        if (index === 0) { // 初始化最小价格为第一个元素
            minPrice = price;
        } else if (price < minPrice) { // 遍历过程中发现最小价格，则重新赋值
            minPrice = price;
        } else if (price - minPrice > maxProfit) { // 比较当日卖出收益与当前已获取的最大收益
            maxProfit = price - minPrice;
        }
    });

    return maxProfit;
};
/**
 * @param {number[]} prices
 * @return {number}
 */
function maxProfit1(prices) {
    let maxProfit = 0; // 最大收益
    let profits = [0]; // 每日最大收益存入数组，第一天初始化为 0

    for (i = 1; i < prices.length; i++) {
        // 计算每日可获取的最大收益值
        profits[i] = Math.max(0, profits[i - 1] + (prices[i] - prices[i - 1]));
        if (profits[i] > maxProfit) { // 比较该日最大收益与已获取最大收益
            maxProfit = profits[i];
        }
    }

    return maxProfit;
};
const prices = [7, 1, 5, 3, 6, 4]
console.log(maxProfit(prices))
console.log(maxProfit1(prices))
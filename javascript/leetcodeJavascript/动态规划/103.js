/**
 * 给定不同面额的硬币 coins 和一个总金额 amount。
 * 编写一个函数来计算可以凑成总金额所需的最少的硬币个数。
 * 如果没有任何一种硬币组合能组成总金额，返回 -1。
 * 你可以认为每种硬币的数量是无限的。
 * @param {*} coins 
 * @param {*} targetAmount 
 * @returns 
 */
const coinChange1 = (coins, targetAmount) => {
  coins.sort((a, b) => b - a)
  let target = 0;
  let count = 0;
  for (let i = 0; i < coins.length; i++) {
    while (target < targetAmount) {
      target = target + coins[i]
      count++
    }
    if (target > targetAmount) {
      target = target - coins[i]
      count--
    }
    if (target === targetAmount) {
      return count
    }
  }
  return   -1
};

const coinChange = (coins, targetAmount) => {
  // 初始化备忘录,用Infinity填满备忘录，Infinity说明该值不可以用硬币凑出来
  const dp = new Array(targetAmount + 1).fill(Infinity);

  // 设置初始条件为0 这一项无法用公式推导出来
  dp[0] = 0;

  for (let amount = 1; amount <= targetAmount; amount++) {
    for (let j = 0; j < coins.length; j++) {
      let coin = coins[j];
      if (coin <= amount) {
        // 根据动态转移方程 求出当前面值需要的硬币数最小值
        dp[amount] = Math.min(
          dp[amount],
          // 比如目标15元 使用5元硬币 拆分为 dp(15 - 5) + 1
          dp[amount - coin] + 1
        );
      }
    }
  }

  // 如果 `dp[amount] === Infinity`说明没有最优解返回-1,否则返回最优解
  return dp[targetAmount] === Infinity ? -1 : dp[targetAmount];
};

// console.log(coinChange([1, 5, 11], 21))
console.log(coinChange([186,419,83,408], 6249))

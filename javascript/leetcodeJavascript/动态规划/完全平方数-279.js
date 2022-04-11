// https://github.com/sl1673495/leetcode-javascript/issues/9
// https://leetcode-cn.com/problems/perfect-squares/
/**
 * @param {number} n
 * @return {number}
 */
let numSquares = function (n) {
  let dp = [];

  // 求0就假设为0次
  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    let j = 1;
    // 初始化为Infinity 这样后面任意一个小值都可以覆盖它
    let min = Infinity;
    while (true) {
      // 用 i 减去不断递增的平方数 j * j
      let prev = i - j * j;
      if (prev < 0) {
        break;
      }

      // 假设i = 10、j = 1 实际上就是在求dp[10 - 1] + 1
      // 也就是凑成 9 的最小次数 再加上 1（也就是 1 这个平方数的次数）
      min = Math.min(min, dp[prev] + 1);
      j++;
    }
    dp[i] = min === Infinity ? 0 : min;
  }

  return dp[n];
};

var numSquares1 = function (n) {
  const dp = Array(n).fill(0) // [...Array(n)].map((_) => 0); //初始化dp数组 当n为0的时候
  for (let i = 1; i <= n; i++) {
      dp[i] = i; // 最坏的情况就是每次+1 比如: dp[3]=1+1+1
      for (let j = 1; i - j * j >= 0; j++) {//枚举前一个状态
          dp[i] = Math.min(dp[i], dp[i - j * j] + 1); // 动态转移方程
      }
  }
  return dp[n];
};

console.log(numSquares1(13))
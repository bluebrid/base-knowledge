<<<<<<< HEAD
/**
 * 给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化。
 * 返回 你可以获得的最大乘积 。
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
  //dp[i]为正整数i拆分之后的最大乘积
  let dp = new Array(n + 1).fill(0);
  dp[2] = 1;

  for (let i = 3; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      //j*(i-j)表示把i拆分为j和i-j两个数相乘
      //j*dp[i-j]表示把i拆分成j和继续把(i-j)这个数拆分，取(i-j)拆分结果中的最大乘积与j相乘
      dp[i] = Math.max(dp[i], dp[i - j] * j, (i - j) * j);
    }
  }
  return dp[n];
};
=======
/**
 * 给定一个正整数 n ，将其拆分为 k 个 正整数 的和（ k >= 2 ），并使这些整数的乘积最大化。
 * 返回 你可以获得的最大乘积 。
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
  //dp[i]为正整数i拆分之后的最大乘积
  let dp = new Array(n + 1).fill(0);
  dp[2] = 1;

  for (let i = 3; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      //j*(i-j)表示把i拆分为j和i-j两个数相乘
      //j*dp[i-j]表示把i拆分成j和继续把(i-j)这个数拆分，取(i-j)拆分结果中的最大乘积与j相乘
      dp[i] = Math.max(dp[i], dp[i - j] * j, (i - j) * j);
    }
  }
  return dp[n];
};
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(integerBreak(10))
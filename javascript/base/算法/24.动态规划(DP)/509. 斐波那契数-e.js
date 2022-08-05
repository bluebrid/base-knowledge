//暴力递归复杂度O(2^n)
var fib = function (N) {
  if (N == 0) return 0;
  if (N == 1) return 1;
  return fib(N - 1) + fib(N - 2);
};
// 递归 + 记忆化
var fib1 = function (n) {
  const memo = {}; // 对已算出的结果进行缓存

  const helper = (x) => {
    if (memo[x]) return memo[x];
    if (x == 0) return 0;
    if (x == 1) return 1;
    memo[x] = helper(x - 1) + helper(x - 2);
    return memo[x];
  };

  return helper(n);
};

// 动态规划
const fib2 = (n) => {
  if (n <= 1) return n;
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    //自底向上计算每个状态
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

console.log(fib2(5))
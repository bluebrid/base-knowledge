var numSquares = function (n) {
    const dp = Array(n).fill(0) // [...Array(n)].map((_) => 0); //初始化dp数组 当n为0的时候
    for (let i = 1; i <= n; i++) {
        dp[i] = i; // 最坏的情况就是每次+1 比如: dp[3]=1+1+1
        for (let j = 1; i - j * j >= 0; j++) {//枚举前一个状态
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1); // 动态转移方程
        }
    }
    return dp[n];
  };
  
  console.log(numSquares(13))
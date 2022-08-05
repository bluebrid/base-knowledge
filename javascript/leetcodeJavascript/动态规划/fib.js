<<<<<<< HEAD
const fib = (n) => {
    if (n <= 1) return n;
    const dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        //自底向上计算每个状态
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
};

=======
const fib = (n) => {
    if (n <= 1) return n;
    const dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        //自底向上计算每个状态
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
};

>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(fib(10))
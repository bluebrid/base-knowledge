// 动态规划
// 思路：当前最大子序和只和前面的子序和相关，循环数组，不断更新最大子序和

var maxSubArray = function (nums) {
    const dp = [];
    let res = (dp[0] = nums[0]);//初始化状态
    for (let i = 1; i < nums.length; ++i) {
        dp[i] = nums[i];
        if (dp[i - 1] > 0) {//前面的状态是正数 则加上(这个是重点)
            dp[i] += dp[i - 1];
        }
        res = Math.max(res, dp[i]);//更新最大值
    }
    return res;
};

//状态压缩
var maxSubArray1 = function (nums) {
    let pre = 0, maxAns = nums[0];
    nums.forEach((x) => {
        pre = Math.max(pre + x, x);
        maxAns = Math.max(maxAns, pre);
    });
    return maxAns;
};

const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
console.log(maxSubArray(nums))
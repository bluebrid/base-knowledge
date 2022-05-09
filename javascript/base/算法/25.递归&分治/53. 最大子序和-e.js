// 动态规划
// 思路：当前最大子序和只和前面的子序和相关，循环数组，不断更新最大子序和
// 和最大的子序列， 如：nums = [-2,1,-3,4,-1,2,1,-5,4] 它组大值得子序列为：连续子数组 [4,-1,2,1] 的和最大，为 6 。

/**
 * 给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * 子数组 是数组中的一个连续部分。
 * @param {*} nums 
 * @returns 
 */
var maxSubArray = function (nums) {
    const dp = []; // c存储临时的结果
    let res = (dp[0] = nums[0]);//初始化状态
    for (let i = 1; i < nums.length; ++i) {
        dp[i] = nums[i];
        if (dp[i - 1] > 0) { // 临时结果的上一个数据的和是否为正数
            //前面的状态是正数 则加上(这个是重点)
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
        pre = Math.max(pre + x, x); // 计算上一个值和累加当前的值的最大值
        maxAns = Math.max(maxAns, pre); // 如果比结果大，则取当前累加后的值，否则就是还是上一个是最大值
    });
    return maxAns;
};

const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
console.log(maxSubArray(nums))
console.log(maxSubArray1(nums))
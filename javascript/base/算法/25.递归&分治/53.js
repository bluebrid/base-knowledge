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
    let max = nums[0]
    let res = [max]
    for (let i = 1; i < nums.length; i++) {
        res[i] = nums[i]
        if (res[i - 1] > 0) {
            res[i] = res[i - 1] + nums[i]
        }
        max = Math.max(max, res[i])
    }
    return max;
};

const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
console.log(maxSubArray(nums))
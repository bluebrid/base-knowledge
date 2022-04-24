/**
 * 给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。
 * 题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
    const res = [];
    res[0] = 1;
    //从左往右遍历
    //记录从左到当前位置前一位的乘积
    for (let i = 1; i < nums.length; i++) {
        res[i] = res[i - 1] * nums[i - 1];
    }
    let right = 1;
    //从右往左遍历
    //从左到当前位置前一位的乘积 乘上 右边元素的积
    for (let j = nums.length - 1; j >= 0; j--) {
        res[j] *= right;
        right *= nums[j];
    }

    return res
};
const nums = [1, 2, 3, 4] // ->  [24,12,8,6]
console.log(productExceptSelf(nums))

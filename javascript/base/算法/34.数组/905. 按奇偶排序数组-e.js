/**
 * 给你一个整数数组 nums，将 nums 中的的所有偶数元素移动到数组的前面，后跟所有奇数元素。
 * 返回满足此条件的 任一数组 作为答案。
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArrayByParity = function (nums) {
    let swapTimes = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i >= nums.length - swapTimes) {
            break
        }
        if (nums[i] % 2 !== 0) {
            let len = nums.length - 1;
            while (len >= 0) {
                if (nums[len] % 2 === 0) {
                    swapTimes++
                    let temp = nums[len] // 偶数
                    nums[len] = nums[i]
                    nums[i] = temp;
                    break;
                }
                len--
            }
        }
    }
    return nums;
};
const nums = [3, 1, 2, 4];
console.log(sortArrayByParity(nums))
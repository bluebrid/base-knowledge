/**
 * 给定一个非负整数数组 nums，  nums 中一半整数是 奇数 ，一半整数是 偶数 。
 * 对数组进行排序，以便当 nums[i] 为奇数时，i 也是 奇数 ；当 nums[i] 为偶数时， i 也是 偶数 。
 * @param {number[]} nums
 * @return {number[]}
 */
 const swap = (nums, i, j) => {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
};
var sortArrayByParityII = function(nums) {
    const n  = nums.length;
    let j = 1;
    for (let i = 0; i < n; i += 2) {
        if (nums[i] & 1) {//循环偶数位置 如果遇到了奇数
            while (nums[j] & 1) {//循环奇数位置 如果遇到了第一个偶数
                j += 2;
            }
            swap(nums, i, j);//交位置换
        }
    }   
    return nums;
};
const nums = [4,2,5,7]; // [4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。
console.log(sortArrayByParityII(nums))
/**
 * 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
 * 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
    nums.sort((a, b) => b - a)
    let res = 0;
    for (let i = 0; i < nums.length; i++) {
        while (nums[i] === nums[i + 1]) i++
        res = res + 1
        if (res === k) return nums[i]
    }
};

var nums =[3,2,3,1,2,4,5,5,6], k = 4

console.log(findKthLargest(nums, k))
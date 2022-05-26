/**
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
 * @param {*} nums 
 * @param {*} val 
 */
var removeElement = function (nums, val) {
    let index = 0;
    while (nums.length && index < nums.length) {
        if (nums[index] === val) {
            nums.splice(index, 1)
            index = 0
        } else {
            index++  // 因为数组是一个引用类型， 删除后，长度是会变化的
        }

    }

    return {
        length: nums.length,
        nums
    }
}
const nums = [3, 2, 2, 3], val = 3; // -> 2, nums=[2,2]
const nums1 = [0, 1, 2, 2, 3, 0, 4, 2], val1 = 2
console.log(removeElement(nums, val))
console.log(removeElement(nums1, val1))
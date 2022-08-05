/**
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。
 * 如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  let left = 0, right = nums.length;
  while (left <= right) {
    const mid = Math.floor((right - left) / 2) + left;
    if (nums[mid] === target) {
      return mid
    } else if (target > nums[mid - 1] && target < nums[mid + 1]) {
      return mid + 1
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1
    }
  }
  return nums.length

};

let nums = [1, 3, 5, 6], target1 = 9, target = 2;
console.log(searchInsert(nums, target1))
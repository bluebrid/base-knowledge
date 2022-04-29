/**
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。
 * 如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {

  let left = 0, right = nums.length
  let result = -1;
  let mid = Math.floor((right - left) / 2)
  while (left <= right) {
    if (nums[mid] === target) {
      result = mid;
      break
    }
    if (left + 1 === right && mid[left] !== target && mid[right] !== target) { // 这个表示插入得索引
      result = left + 1;
      break
    }
    if (nums[mid] > target) {
      right = mid + 1;
    } else {
      left = mid + 1
    }
    mid = Math.floor((right - left) / 2 + left)
  }
  return result
};

let nums = [1, 3, 5, 6], target = 9;
console.log(searchInsert(nums, target))
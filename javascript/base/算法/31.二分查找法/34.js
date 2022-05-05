/**给定一个按照升序排列的整数数组 nums，和一个目标值 target。
 * 找出给定目标值在数组中的开始位置和结束位置。
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 * 
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */
var searchRange = function (nums, target) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((right - left) / 2) + left
    if (nums[mid] === target) {
      left = right = mid
      while (nums[left - 1] === target) left--
      while (nums[right + 1] === target) right++
      return [left, right]
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return [-1, 1]
};
const nums = [5, 7, 7, 8, 8, 10], target = 7
console.log(searchRange(nums, target))
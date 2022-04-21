/**给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
 * 如果数组中不存在目标值 target，返回 [-1, -1]。
 * 
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */
var searchRange = function (nums, target) {
  let left = 0, right = nums.length - 1, mid;
  while (left <= right) {//二分查找target
    mid = (left + right) >> 1;
    if (nums[mid] === target) break;
    if (nums[mid] > target) right = mid - 1;
    else left = mid + 1;
  }
  if (left > right) return [-1, -1];
  let i = mid, j = mid;
  while (nums[i] === nums[i - 1]) i--;//向左尝试找相同的元素
  while (nums[j] === nums[j + 1]) j++;//向右尝试找相同的元素
  return [i, j];
};
const nums = [5, 7, 7, 8, 8, 10], target = 8
console.log(searchRange(nums, target))
/**
 * 峰值元素是指其值严格大于左右相邻值的元素。
 * 给你一个整数数组 nums，找到峰值元素并返回其索引。数组可能包含多个峰值，在这种情况下，返回 **任何一个峰值** 所在位置即可。
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function (nums) {

  let result
  const find = (nums, left, right) => {
    if (right <= left) {
      return false;
    }
    let mid = Math.floor((right - left) / 2)
    if (nums[mid] > nums[mid - 1] && nums[mid] > nums[mid + 1]) {
      result = mid;
      return true;
    }

    return find(nums, left, mid - 1) || find(nums, mid, right);
  }

  const boolR = find(nums, 0, nums.length - 1)
  if (boolR) {
    return result;
  }

};

const nums = [1, 2, 1, 3, 5, 6, 4]
const nums1 = [1, 2, 3, 1];
// console.log(findPeakElement(nums))
console.log(findPeakElement(nums1))
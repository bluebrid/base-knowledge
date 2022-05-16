const nums = [0, 1, 5, 3, 0, 3, 12, 0, 0, 8]
/**
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 1. 必须在原数组上操作，不能拷贝额外的数组。
 * 2. 尽量减少操作次数。
 * @param {*} nums 
 * @returns 
 */
const func = function (nums) {
  let left = 0, right = nums.length - 1;
  let firstZone = -1;
  while (left <= right) {
    if (nums[left] !== 0) {
      nums[firstZone] = nums[left]
      nums[left] = 0;
      firstZone = firstZone + 1
      left = left + 1;
    } else {
      firstZone = firstZone > -1 ? firstZone : left
      left++
    }
  }
  return nums
}
console.log(func(nums))
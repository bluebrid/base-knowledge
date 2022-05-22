/**
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
 * 注意：答案中不可以包含重复的三元组。
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  let res = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= 0) {
      break
    }
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const tempVal = nums[i] + nums[left] + nums[right]
      if (tempVal === 0) {
        res.push([nums[i], nums[left], nums[right]])
        while(left < right && nums[left] === nums[left+1]) left++
        while(left < right && nums[right-1] === nums[right]) right --
        break
      }
      left++
      right--
    }
  }
  return res
};
const nums = [-1, 0, 1, 2, -1, -4]
console.log(threeSum(nums))
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  nums.sort((a, b) => b - a)
  let res = []
  for (let i = 0; i < nums.length; i++) {
    if (res.length === k) {
      return res[res.length - 1]
    }
    if (!res.includes(nums[i])) {
      res.push(nums[i])
    }
  }
};

const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4
console.log(findKthLargest(nums, k))
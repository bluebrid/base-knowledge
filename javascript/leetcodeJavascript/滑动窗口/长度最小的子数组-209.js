/**
 * https://leetcode-cn.com/problems/minimum-size-subarray-sum/
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。
 * 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
let minSubArrayLen = function (s, nums) {
  let n = nums.length
  // 定义[i,...j]滑动窗口 取这个窗口里的和
  let i = 0
  let j = -1

  let sum = 0
  let res = Infinity

  while (i < n) {
    if (sum < s) {
      sum += nums[++j] // J，有指针 就是在滑动
    } else {
      sum -= nums[i]
      // i 左指针在滑动
      i++
    }

    if (sum >= s) {
      res = Math.min(res, j - i + 1)
    }
  }
  return res === Infinity ? 0 : res
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]))

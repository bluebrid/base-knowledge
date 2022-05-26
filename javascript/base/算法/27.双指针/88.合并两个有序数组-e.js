/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

 var merge = function(nums1, nums2) {
  let p1 = 0, p2 = 0;
  const m = nums1.length
  const n = nums2.length;
  // 先填充一个最大长度的数组
  const sorted = new Array(m + n).fill(0);
  var cur;
  while (p1 < m || p2 < n) {
      if (p1 === m) {
          cur = nums2[p2++];
      } else if (p2 === n) {
          cur = nums1[p1++];
      } else if (nums1[p1] < nums2[p2]) {
          cur = nums1[p1++];
      } else {
          cur = nums2[p2++];
      }
      sorted[p1 + p2 - 1] = cur;
  }
  for (let i = 0; i != m + n; ++i) {
      nums1[i] = sorted[i];
  }
  return nums1
};
const arr1 = [1,4,7,9]
const arr2 = [3,6,11,33,44]
console.log(merge(arr1, arr2))
// @lc code=end

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, nums2) {
  if (nums1.length < nums2.length) return merge(nums2, nums1)
  let result = []
  let len1 = nums1.length, len2 = nums2.length
  let i = 0; j = 0;
  while (i < len1 || j < len2) {
    if (nums1[i] < nums2[j]) {
      result.push(nums1[i])
      i++
    } else if (nums1[i] === nums2[j]) {
      result.push(nums1[i])
      result.push(nums2[j])
      i++
      j++
    } else {
      result.push(nums2[j])
      j++
    }
  }
  return result
};
const nums1 = [1, 2, 3], nums2 = [2, 5, 6]
console.log(merge(nums1, nums2))
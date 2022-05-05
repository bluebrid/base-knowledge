
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

var merge = function (nums1, nums2) {
  let len1 = nums1.length;
  let len2 = nums2.length;
  let temArr = new Array(len1 + len2).fill(0)
  let i = 0; j = 0;
  let index = 0;
  while (i < len1 || j < len2) {
    if (nums1[i] < nums2[j]) {
      temArr[index] =nums1[i]
      i++
    } else {
      temArr[index] =nums2[j]
      j++
    }
    index ++
  }
  return temArr
};
const arr1 = [1, 4, 7, 9]
const arr2 = [3, 6, 11, 33, 44]
console.log(merge(arr1, arr2))

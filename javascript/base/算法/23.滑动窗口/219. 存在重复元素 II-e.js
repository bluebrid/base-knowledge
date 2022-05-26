/**
 * 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，
 * 满足 nums[i] == nums[j] 且 abs(i - j) <= k 。
 * 如果存在，返回 true ；否则，返回 false 。
 * @param {*} nums 
 * @param {*} k 
 * @returns 
 */
var containsNearbyDuplicate = function (nums, k) {
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (set.has(nums[i])) {//找到了重复的元素
      return true;
    }
    set.add(nums[i]);//没找到就加入set中 扩大窗口
    if (set.size > k) {//滑动窗口超过了指定大小，缩小窗口
      set.delete(nums[i - k]);
    }
  }
  return false;
};
let nums = [1, 2, 3, 1, 2, 3], k = 2;
console.log(containsNearbyDuplicate(nums, k))
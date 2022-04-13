// 循环数组，不断将元素加入滑动窗口中，也就是加入set，如果set中存在重复元素并且窗口大小小于指定大小就返回，否则加入set中，当滑动窗口超过了指定大小，缩小窗口
// 需求： 给出一个数组， 判断在一个指定长度的子数组中是否存在重复元素
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
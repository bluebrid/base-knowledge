<<<<<<< HEAD
/**
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。
 * 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 
 * [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
 * @param {*} target 
 * @param {*} nums 
 */
// 全部是正正数
var minSubArrayLen = function (target, nums) {
  const len = nums.length;
  let l = r = sum = 0,
    res = len + 1; //最大的窗口不会超过自身长度
  while (r < len) {
    sum += nums[r++];//扩大窗口
    while (sum >= target) { // 可以循环的去建之前的所有的数据，因为后面添加的是一个很大的数字， 可以移除个位置
      res = res < r - l ? res : r - l;//更新最小值
      sum -= nums[l++];//缩小窗口
    }
  }
  return res > len ? 0 : res;
};
const target = 7, nums = [2, 3, 1, 2, 4, 3];
=======
/**
 * 给定一个含有 n 个正整数的数组和一个正整数 target 。
 * 找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 
 * [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。
 * @param {*} target 
 * @param {*} nums 
 */
// 全部是正正数
var minSubArrayLen = function (target, nums) {
  const len = nums.length;
  let l = r = sum = 0,
    res = len + 1; //最大的窗口不会超过自身长度
  while (r < len) {
    sum += nums[r++];//扩大窗口
    while (sum >= target) { // 可以循环的去建之前的所有的数据，因为后面添加的是一个很大的数字， 可以移除个位置
      res = res < r - l ? res : r - l;//更新最小值
      sum -= nums[l++];//缩小窗口
    }
  }
  return res > len ? 0 : res;
};
const target = 7, nums = [2, 3, 1, 2, 4, 3];
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(minSubArrayLen(target, numbers))
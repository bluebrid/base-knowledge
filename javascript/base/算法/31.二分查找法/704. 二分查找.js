<<<<<<< HEAD
/**
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const search_interval = (nums, target, left, right) => {
    if (left > right) {
      return -1
    }
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {//判断目标值和中间元素的大小
      return mid
    } else if (nums[mid] < target) {//递归寻找目标元素
      return search_interval(nums, target, mid + 1, right)
    } else {
      return search_interval(nums, target, left, mid - 1)
    }
  }

  return search_interval(nums, target, 0, target.length - 1)
};

var search1 = function (nums, target) {
  if (nums.length < 1) return -1
  let left = 0, right = nums.length
  let mid = 0;
  let result = -1
  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    if (nums[mid] === target) {
      result = mid
      return result
    };
    if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1;
    }
  }
  return result
};

let nums = [-1, 0, 3, 5, 9, 12], target = -1;
=======
/**
 * 给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const search_interval = (nums, target, left, right) => {
    if (left > right) {
      return -1
    }
    let mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) {//判断目标值和中间元素的大小
      return mid
    } else if (nums[mid] < target) {//递归寻找目标元素
      return search_interval(nums, target, mid + 1, right)
    } else {
      return search_interval(nums, target, left, mid - 1)
    }
  }

  return search_interval(nums, target, 0, target.length - 1)
};

var search1 = function (nums, target) {
  if (nums.length < 1) return -1
  let left = 0, right = nums.length
  let mid = 0;
  let result = -1
  while (left <= right) {
    mid = Math.floor((left + right) / 2)
    if (nums[mid] === target) {
      result = mid
      return result
    };
    if (nums[mid] > target) {
      right = mid - 1
    } else {
      left = mid + 1;
    }
  }
  return result
};

let nums = [-1, 0, 3, 5, 9, 12], target = -1;
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(search1(nums, target))
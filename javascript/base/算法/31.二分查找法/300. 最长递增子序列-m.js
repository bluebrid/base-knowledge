<<<<<<< HEAD
/**
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 * 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 * [从最长递增子序列学会如何推状态转移方程](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485269&idx=1&sn=571a6366b0b592f103971ae3e119998b&scene=21#wechat_redirect)
 * @param {number[]} nums
 * @return {number}
 */
// 动态规划
const lengthOfLIS = (nums) => {
  // 先定义有个相同长度的数组，每个值填充1
  let dp = Array(nums.length).fill(1);
  let result = 1;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {//当nums[i] > nums[j]，则构成一个上升对
        dp[i] = Math.max(dp[i], dp[j] + 1);//更新dp[i]
      }
    }
    result = Math.max(result, dp[i]);//更新结果
  }

  return result;
};
// 二分查找 + 贪心
var lengthOfLIS1 = function (nums) {
  let n = nums.length;
  if (n <= 1) {
    return n;
  }
  let tail = [nums[0]];//存放最长上升子序列数组
  for (let i = 0; i < n; i++) {
    if (nums[i] > tail[tail.length - 1]) {//当nums中的元素比tail中的最后一个大时 可以放心push进tail
      tail.push(nums[i]);
    } else {//否则进行二分查找
      // 否则进行二分查找，让比较小的数二分查找到合适的位置，让后面有更多的数字与这个数形成上升子序列
      let left = 0;
      let right = tail.length - 1;
      while (left < right) {
        let mid = (left + right) >> 1;
        if (tail[mid] < nums[i]) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      // 就是将之前的数据给替换到
      tail[left] = nums[i];//将nums[i]放置到合适的位置，此时前面的元素都比nums[i]小
    }
  }
  return tail.length;
};
const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(nums))
=======
/**
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 * 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 * [从最长递增子序列学会如何推状态转移方程](https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485269&idx=1&sn=571a6366b0b592f103971ae3e119998b&scene=21#wechat_redirect)
 * @param {number[]} nums
 * @return {number}
 */
// 动态规划
const lengthOfLIS = (nums) => {
  // 先定义有个相同长度的数组，每个值填充1
  let dp = Array(nums.length).fill(1);
  let result = 1;

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {//当nums[i] > nums[j]，则构成一个上升对
        dp[i] = Math.max(dp[i], dp[j] + 1);//更新dp[i]
      }
    }
    result = Math.max(result, dp[i]);//更新结果
  }

  return result;
};
// 二分查找 + 贪心
var lengthOfLIS1 = function (nums) {
  let n = nums.length;
  if (n <= 1) {
    return n;
  }
  let tail = [nums[0]];//存放最长上升子序列数组
  for (let i = 0; i < n; i++) {
    if (nums[i] > tail[tail.length - 1]) {//当nums中的元素比tail中的最后一个大时 可以放心push进tail
      tail.push(nums[i]);
    } else {//否则进行二分查找
      // 否则进行二分查找，让比较小的数二分查找到合适的位置，让后面有更多的数字与这个数形成上升子序列
      let left = 0;
      let right = tail.length - 1;
      while (left < right) {
        let mid = (left + right) >> 1;
        if (tail[mid] < nums[i]) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }
      // 就是将之前的数据给替换到
      tail[left] = nums[i];//将nums[i]放置到合适的位置，此时前面的元素都比nums[i]小
    }
  }
  return tail.length;
};
const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(nums))
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(lengthOfLIS1(nums))
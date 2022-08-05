/**
 * 给你一个整数数组 nums ，
 * 请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 * @param {number[]} nums
 * @return {number}
 */
 var maxSubArray1 = function(nums) {
  let pre = 0, maxAns = nums[0];
  nums.forEach((x) => {
      // 也就是上一个只
      pre = Math.max(pre + x, x); // 下一个和当前的和，与当前进行比较，取大的
      maxAns = Math.max(maxAns, pre);
  });
  return maxAns;
}

// 贪心算法
var maxSubArray = function(nums) {
  let ans = nums[0];
  let sum = 0;
  for(const num of nums) {
      if(sum > 0) {
          sum += num;
      } else {
          sum = num;
      }
      ans = Math.max(ans, sum);
  }
  return ans;
};

const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(nums))
<<<<<<< HEAD
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= target; i++) {
    for (const num of nums) {
      if (num <= i) {
        dp[i] += dp[i - num];
      } else {
        break
      }
    }
  }
  console.log(dp)
  return dp[target];

};
const nums = [1, 2, 3], target = 4
=======
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= target; i++) {
    for (const num of nums) {
      if (num <= i) {
        dp[i] += dp[i - num];
      } else {
        break
      }
    }
  }
  console.log(dp)
  return dp[target];

};
const nums = [1, 2, 3], target = 4
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(combinationSum4(nums, target))
// 这应该叫贪心算法
const maxSubArray = (nums) => {
  let max = nums[0]
  let ans = nums[0]
  for (let i = 1; i < nums.length; i++) {
    if (max > 0) {
      // 上一轮的>0,进行累计
      max = max + nums[i]
    } else {
      // 如果max 都是负数， 则直接重置
      max = nums[i]
    }
    ans = Math.max(max, ans)
  }
  return ans;
}
// DP
const maxSubArray1 = (nums) => {

}
const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(nums))
console.log(maxSubArray1(nums))
/**
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 * https://101.zoo.team/dong-tai-gui-hua/dong-tai-gui-hua-part-2-da-jia-jie-she-ling-qian-dui-huan-he-tiao-yue-you-xi
 * @param {*} nums 
 */
const rob = function (nums) {
  const len = nums.length;
  if (len === 0) return 0;
  // DP 用来保存每个房间
  const dp = new Array(len + 1);
  dp[0] = 0;
  dp[1] = nums[0]; // 第一个房子
  for (let i = 2; i <= len; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]); // i -2 ---------- i - 1 ----------- i 
  }
  return dp[len];
};
const nums = [2, 7, 19, 11, 1]
console.log(rob(nums))
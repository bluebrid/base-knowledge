/**
 * 给你一个非负整数数组 nums ，你最初位于数组的第一个位置
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度。
 * 你的目标是使用最少的跳跃次数到达数组的最后一个位置。
 * 假设你总是可以到达数组的最后一个位置。
 * @param {number[]} nums
 * @return {number}
 */
// 贪心算法
const canJump = function (nums) {
  let max = 0; // 跳到最远的距离
  for (let i = 0; i < nums.length - 1; i += 1) {
    // 找到能跳的最远的的距离
    if (i + nums[i] > max) {
      max = i + nums[i];
    }
    // 如果跳的最远的小于当前脚标，返回false
    if (max <= i) {
      return false;
    }
  }
  return true;
};

// 动态规划
const canJump1 = function (nums) {
  // 定义一个数组，用来记录nums的点是否是可以达到的
  const list = [nums.length];
  // 遍历nums
  for (let i = 1; i < nums.length; i++) {
    // 遍历list
    for (let j = 0; j < i; j++) {
      // 如果j点是可以到达的，并且j点是可以达到i点的
      // 则表示i点也是可以达到的
      if (list[j] && nums[j] + j >= i) {
        list[i] = true;
        // 如果i点可以达到，则跳出当前循环
        break;
      }
    }
  }
  return list[nums.length - 1];
};
const nums = [2, 3, 1, 1, 4]
console.log(canJump(nums))
console.log(canJump1(nums))
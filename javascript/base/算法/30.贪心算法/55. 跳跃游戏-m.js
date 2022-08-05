/**
 * 给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度
 * 判断你是否能够到达最后一个下标。
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  //思路： 不用考虑每一步跳跃到那个位置，而是尽可能的跳跃到最远的位置，看最多能覆盖的位置，不断更新能覆盖的距离
  if (nums.length === 1) return true; //长度为1 直接就是终点
  let cover = nums[0]; //能覆盖的最远距离
  for (let i = 0; i <= cover; i++) {
    console.log(cover, i + nums[i])
    // 之所以加上i是因为i是低i个元素，前面的阶梯说明已经跳过了。 
    cover = Math.max(cover, i + nums[i]); //当前覆盖距离cover和当前位置加能跳跃的距离中取一个较大者
    if (cover >= nums.length - 1) {
      //覆盖距离超过或等于nums.length - 1 说明能到达终点
      return true;
    }
  }
  return false; //循环完成之后 还没返回true 就是不能达到终点
};

const nums = [2, 3, 1, 1, 4]
const nums1 = [3, 2, 1, 1, 4]
// console.log(canJump(nums))
console.log(canJump(nums1))
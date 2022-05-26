/**
 * 给定一个长度为 n 的整数数组 height 。
 * 有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
 * 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let max = 0; left = 0; right = height.length - 1;
  while (left < right) {
    const area = (right - left) * (Math.min(height[left], height[right]))
    max = Math.max(max, area)
    if (height[left] > height[right]) {
      right--
    } else {
      left++
    }
  }
  return max
};
let height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
let height1 = [1, 8, 6, 2, 5, 4, 8, 3, 7]
console.log(maxArea(height1))
/**
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，
 * 使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
* @param {number[]} nums
* @return {number[][]}
*/
let threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  let results = []
  for (let i = 0; i < nums.length - 2; i++) {
    //[-1, 0, 1, 2, -1, -4] => [-4, -1, -1, 0, 1, 2]
    // 经过排序的， 前面的一定是负数
    if (nums[i] >= 0) break;// 后面的一定是正数，则退出循环
    let L = i + 1, R = nums.length - 1;
    while (L < R) {
      if (nums[i] + nums[L] + nums[R] === 0) {
        results.push([nums[i], nums[L], nums[R]])
      }
      while (L < R && nums[L] === nums[L + 1]) L++
      while (L < R && nums[R] === nums[L - 1]) R++
      L++
      R--
    }

  }
  return results
}


console.log(threeSum([-1, 0, 1, 2, -1, -4]))
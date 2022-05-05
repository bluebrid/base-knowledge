/**
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，
 * 使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
* @param {number[]} nums
* @return {number[][]}
*/
let twoSum1 = (nums, target) => {
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        result.push([nums[i], nums[j]])
      }
    }
  }
  return result;
}
let twoSum = (nums, target) => {
  let map = new Map()
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i]
    let result = map.get(target - num)
    if (result !== undefined) {
      results.push([nums[result], num])
    }
    map.set(num, i)
  }
  return result;
}
let threeSum = function (nums) {
  nums.sort((a, b) => a - b) // 先排序，左边为小于0右边为大于0
  const results = [];
  for (let i = 0; i < nums.length; i++) {
    const temVal = -nums[i]
    const result = twoSum(nums.slice(i + 1), temVal)
    if (result.length) {
      result.forEach((item) => {
        results.push([nums[i], ...item])
      })
    }
  }
  return results;
}


console.log(JSON.stringify(threeSum([-1, 0, 1, 2, -1, -4])))

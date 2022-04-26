/**
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，
 * 使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
* @param {number[]} nums
* @return {number[][]}
*/
let twoSum = function (nums, target) {
  let map = new Map()
  let results = []
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i]
    let result = map.get(target - num)
    if (result !== undefined) {
      results.push([nums[result], num])
    }
    map.set(num, i)
  }
  return results
}
/**
 * 利用两数之和的变形来求解，循环判断第三个数的负数是否能和另外两个数相加得到。
 */
let threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  let set = new Set()
  let results = []
  for (let i = 0; i < nums.length - 2; i++) {
    //[-1, 0, 1, 2, -1, -4] => [-4, -1, -1, 0, 1, 2]
    // 经过排序的， 前面的一定是负数
    const t = nums.slice(i + 1)
    let find = twoSum(t, -nums[i])
    if (find) {
      find.forEach((arr) => {
        if (!set.has(arr.join(''))) {
          results.push([nums[i], ...arr])
        }
        set.add(arr.join(''))
      })
    }
  }
  return results
}

var threeSum1 = function (nums) {
  let ans = [];
  const len = nums.length;
  if (nums == null || len < 3) return ans;//数组的长度大于3
  nums.sort((a, b) => a - b); // 排序
  for (let i = 0; i < len; i++) {
    //[-1, 0, 1, 2, -1, -4] => [-4, -1, -1, 0, 1, 2]
    // 经过排序的， 前面的一定是负数
    if (nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
    if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
    // 第一次
    let L = i + 1;
    let R = len - 1;
    while (L < R) {//虽然里面还有两个循环，但是整体的L和R移动的时间内复杂度还是o(n)
      const sum = nums[i] + nums[L] + nums[R];
      if (sum == 0) {
        ans.push([nums[i], nums[L], nums[R]]);
        while (L < R && nums[L] == nums[L + 1]) L++; // 去重
        while (L < R && nums[R] == nums[R - 1]) R--; // 去重
        L++;
        R--;
      }
      else if (sum < 0) L++;
      else if (sum > 0) R--;
    }
  }
  return ans;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]))
console.log(threeSum1([-1, 0, 1, 2, -1, -4]))

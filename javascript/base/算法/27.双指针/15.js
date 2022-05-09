let threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) return res;
    let L = i + 1, R = nums.length - 1;
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R]
      if (sum === 0) {
        res.push([nums[i], nums[L], nums[R]])
        while (nums[L] === nums[L + 1]) L++
        while (nums[R] === nums[R - 1]) R--
      }
      R--
      L++
    }
  }
  return res
}


console.log(JSON.stringify(threeSum([-1, 0, 1, 2, -1, -4])))
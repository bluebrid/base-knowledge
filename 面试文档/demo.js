const nums = [0, 1, 5, 3, 0, 3, 12, 0, 0, 8]
const func = function (nums) {
  let left = 0, right = nums.length - 1;
  let firstZone = -1;
  while (left <= right) {
    if (nums[left] !== 0) {
      nums[firstZone] = nums[left]
      nums[left] = 0;
      firstZone = firstZone + 1
      left = left + 1;
    } else {
      firstZone = firstZone > -1 ? firstZone : left
      left++
    }
  }
  return nums
}
console.log(func(nums))
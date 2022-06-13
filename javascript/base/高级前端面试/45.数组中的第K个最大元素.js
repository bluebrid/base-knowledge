const maxNthNum = (nums, k) => {
    nums.sort((a, b) => b - a)
    let index = 0;
    let count = 0
    console.log(nums)
    while (index < nums.length && count < k) {
        count++
        while (nums[index] === nums[index + 1]) index++
        if (count === k) {
            return nums[index]
        }
        index++
    }
    return null

}
const nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4;
console.log(maxNthNum(nums, k))
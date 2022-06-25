const majorityElement  = (nums: number[]): number => {
    nums.sort((a, b) => a - b)
    const mid = Math.floor(nums.length / 2)
    return nums[mid]
}
const majorityElement1  = (nums: number[]): number => {

    for (let i = 0; i < nums.length; i++) {

    }
    return 0
}
const nums = [2, 2, 1, 1, 1, 2, 2, 2, 3, 4, 5, 2, 2, 2]
console.log(majorityElement (nums))
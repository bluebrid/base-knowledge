const cals = (nums) => {
    let res = new Array(nums.length)
    let left = 0, right = res.length - 1
    while (nums.length) {
        const first = nums.shift()
        const last = nums.shift();
        if (first) {
            res[left] = first
            left++
        }
        if (last) {
            res[right] = last;
            right--
        }
    }
    return res
}
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
console.log(cals(nums))
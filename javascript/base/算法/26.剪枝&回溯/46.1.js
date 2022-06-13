var permute1 = (nums) => {
    let res = [];
    const helper = (path) => {
        if (path.length === nums.length) {
            res.push([...path])
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (path.includes(nums[i])) {
                continue
            }
            path.push(nums[i])
            helper(path)
            path.pop()
        }
    }
    helper([])
    return res
}
const nums = [1, 2, 3]
console.log(JSON.stringify(permute1(nums)))
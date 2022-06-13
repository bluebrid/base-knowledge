function Solution(nums) {
    this.nums = nums
}
Solution.prototype.reset =function() {
    return this.nums
}
Solution.prototype.shuffle = function() {
    let res = [...this.nums]
    const len = res.length
    for(let i=0;i<len;i++) {
        const random = Math.floor(Math.random() *len)
        const temp = res[i]
        res[i] = res[random]
        res[random] = temp
    }
    return res;
}
const nums = [1,2,3,4,5,7]
const s = new Solution(nums)
console.log(s.shuffle())
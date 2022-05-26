/**
 * 给你一个整数数组 nums 。如果任一值在数组中出现 至少两次 ，返回 true ；
 * 如果数组中每个元素互不相同，返回 false 。
 * @param {*} nums 
 */
var containsDuplicate = function(nums) {
    const setVal = new Set(nums)
    return [...setVal].length != nums.length
}
var containsDuplicate1 = function(nums) {
    nums = nums.sort((a,b) => a -b)
    for(let i=0;i< nums.length;i++){
        if(nums[i+1] === nums[i]) {
            return true
        }
    }
    return false
} 
const nums = [1,2,3,1];
console.log(containsDuplicate(nums))
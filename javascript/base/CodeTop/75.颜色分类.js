/**
 * 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
 * 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const sortColors = function (nums) {
    const map = new Map([
        ['red', 0],
        ['white', 1],
        ['blue', 2]
    ])
    const valueMap = new Map([
        ['red', 0],
        ['white', 0],
        ['blue', 0]
    ])
    
};
const nums = [2, 0, 2, 1, 1, 0]
console.log(sortColors(nums))
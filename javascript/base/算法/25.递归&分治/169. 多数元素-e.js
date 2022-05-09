// 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。

// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。

var majorityElement = function (nums) {
    nums.sort((a, b) => a - b); // 先进行排序， 然后,n/2, 这个元素其中肯定有一个在中间的
    return nums[Math.floor(nums.length / 2)];
};

console.log(majorityElement([1,2,3,4]))
console.log(majorityElement([3,2,2,2,3,6,6,6]))
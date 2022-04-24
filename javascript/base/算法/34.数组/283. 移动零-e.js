/**
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * @param {*} nums 
 */

var moveZeroes = function (nums) {
  for(let i =0;i < nums.length; i ++) {
    if (nums[i] === 0) {
      for (let j=i+1; j< nums.length; j++) {
        if (nums[j] !== 0){
          let temp = nums[i]
          nums[i]= nums[j];
          nums[j] = temp;
          break;
        }
      }
    }
  }
  return nums;
}
let nums = [0,1,0,3,12]
console.log(moveZeroes(nums))
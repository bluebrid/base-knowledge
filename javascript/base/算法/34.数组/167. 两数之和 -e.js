<<<<<<< HEAD
/**给你一个下标从 1 开始的整数数组 numbers ，该数组已按 非递减顺序排列  ，请你从数组中找出满足相加之和等于目标数 target 的两个数。如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，则 1 <= index1 < index2 <= numbers.length 。

以长度为 2 的整数数组 [index1, index2] 的形式返回这两个整数的下标 index1 和 index2。

你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。

你所设计的解决方案必须只使用常量级的额外空间。
 * 
 * @param {*} numbers 
 * @param {*} target 
 */
var twoSum = function (numbers, target) {
  let [left, right] = [0, numbers.length - 1];//左右指针
  while (left < right) {//
    if (numbers[left] + numbers[right] > target) {//和大了 right左移一位
      right--;
    } else if (numbers[left] + numbers[right] < target) {//和小了left右移一位
      left++;
    } else {
      return [left + 1, right + 1];
    }
  }
};
const numbers = [2, 7, 11, 15], target = 9;
=======
/**给你一个下标从 1 开始的整数数组 numbers ，该数组已按 非递减顺序排列  ，请你从数组中找出满足相加之和等于目标数 target 的两个数。如果设这两个数分别是 numbers[index1] 和 numbers[index2] ，则 1 <= index1 < index2 <= numbers.length 。

以长度为 2 的整数数组 [index1, index2] 的形式返回这两个整数的下标 index1 和 index2。

你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。

你所设计的解决方案必须只使用常量级的额外空间。
 * 
 * @param {*} numbers 
 * @param {*} target 
 */
var twoSum = function (numbers, target) {
  let [left, right] = [0, numbers.length - 1];//左右指针
  while (left < right) {//
    if (numbers[left] + numbers[right] > target) {//和大了 right左移一位
      right--;
    } else if (numbers[left] + numbers[right] < target) {//和小了left右移一位
      left++;
    } else {
      return [left + 1, right + 1];
    }
  }
};
const numbers = [2, 7, 11, 15], target = 9;
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(twoSum(numbers, target))
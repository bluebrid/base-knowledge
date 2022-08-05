<<<<<<< HEAD
/**
 * 整数 x ，计算并返回 x 的 算术平方根 。
 * 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  let left = 0;
  let right = x;
  let ans = -1
  while (left <= right) {
    let mid = Math.round((left + right) / 2);
    let product = mid * mid;
    if (product < x) {
      ans = mid
      left = mid + 1;
    } else if (product > x) {
      right = mid - 1;
    } else if (product === x) {
      return mid;
    }
  }
  return ans
};

=======
/**
 * 整数 x ，计算并返回 x 的 算术平方根 。
 * 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  let left = 0;
  let right = x;
  let ans = -1
  while (left <= right) {
    let mid = Math.round((left + right) / 2);
    let product = mid * mid;
    if (product < x) {
      ans = mid
      left = mid + 1;
    } else if (product > x) {
      right = mid - 1;
    } else if (product === x) {
      return mid;
    }
  }
  return ans
};

>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(mySqrt(200));
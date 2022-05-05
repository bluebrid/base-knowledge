/**
 * 整数 x ，计算并返回 x 的 算术平方根 。
 * 由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  let left = 0, right = x;
  let ans = -1;
  while (left <= right) {
    const mid = Math.floor((right + left) / 2)
    const result = mid * mid
    if (result === x) {
      return mid
    } else if (result > x) {
      right = mid - 1
    } else {
      ans = mid
      left = mid + 1
    }
  }
  return ans
};

console.log(mySqrt(200));
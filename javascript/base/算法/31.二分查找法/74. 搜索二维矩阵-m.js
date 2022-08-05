<<<<<<< HEAD
/**
 * 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
 * 1. 每行中的整数从左到右按升序排列。
 * 2. 每行的第一个整数大于前一行的最后一个整数。
 * @param {*} matrix 
 * @param {*} target 
 * @returns 
 */
var searchMatrix = function (matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let low = 0, high = m * n - 1;
  while (low <= high) {
    const mid = Math.floor((high - low) / 2) + low;
    const x = matrix[Math.floor(mid / n)][mid % n];//一维坐标转换成二维坐标
    if (x < target) {
      low = mid + 1;
    } else if (x > target) {
      high = mid - 1;
    } else {
      return true;
    }
  }
  return false;
};
const matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3;
=======
/**
 * 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
 * 1. 每行中的整数从左到右按升序排列。
 * 2. 每行的第一个整数大于前一行的最后一个整数。
 * @param {*} matrix 
 * @param {*} target 
 * @returns 
 */
var searchMatrix = function (matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let low = 0, high = m * n - 1;
  while (low <= high) {
    const mid = Math.floor((high - low) / 2) + low;
    const x = matrix[Math.floor(mid / n)][mid % n];//一维坐标转换成二维坐标
    if (x < target) {
      low = mid + 1;
    } else if (x > target) {
      high = mid - 1;
    } else {
      return true;
    }
  }
  return false;
};
const matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3;
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(searchMatrix(matrix, target))
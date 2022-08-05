<<<<<<< HEAD
/**
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  if (num1.length < num2.length) {
    return addStrings(num2, num1)
  }
  let arr1 = num1.split('')
  let arr2 = num2.split('')
  arr1 = arr1.reverse()
  arr2 = arr2.reverse();
  for (let i = 0; i < arr1.length; i++) {
    const tempVal = parseInt(arr1[i]) + parseInt(arr2[i] || 0)
    if (tempVal >= 10) {
      arr1[i] = tempVal - 10
      arr1[i + 1] = parseInt(arr1[i + 1] || 0) + 1
    } else {
      arr1[i] = tempVal
    }
  }
  return arr1.reverse().join('')
};


const num1 = "456", num2 = "77";
=======
/**
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  if (num1.length < num2.length) {
    return addStrings(num2, num1)
  }
  let arr1 = num1.split('')
  let arr2 = num2.split('')
  arr1 = arr1.reverse()
  arr2 = arr2.reverse();
  for (let i = 0; i < arr1.length; i++) {
    const tempVal = parseInt(arr1[i]) + parseInt(arr2[i] || 0)
    if (tempVal >= 10) {
      arr1[i] = tempVal - 10
      arr1[i + 1] = parseInt(arr1[i + 1] || 0) + 1
    } else {
      arr1[i] = tempVal
    }
  }
  return arr1.reverse().join('')
};


const num1 = "456", num2 = "77";
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(addStrings(num1, num2))
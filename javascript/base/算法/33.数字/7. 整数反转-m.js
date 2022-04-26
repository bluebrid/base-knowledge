/**
 * 数字反转
 * @param {*} num 
 * @returns 
 */
function reverse(num) {
  let result = 0
  let flag = false
  if (num < 0) {
    num = -num;
    flag = true;
  }
  while (num >= 10) {
    const tempValue = num % 10 // 3 
    result = (result + tempValue) * 10
    num = Math.floor(num / 10) // 12 
  }
  result = result + num
  return flag ? -result : result
}
let num1 = -123;
let num = -101;
let num2 = -100
console.log(reverse(num))
console.log(reverse(num1))
console.log(reverse(num2))
// console.log(123 / 10)


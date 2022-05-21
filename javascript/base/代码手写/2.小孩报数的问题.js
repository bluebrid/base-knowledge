/**
 * 有30个小孩儿，编号从1-30，围成一圈依此报数，1、2、3 数到 3 的小孩儿退出这个圈，
 * 然后下一个小孩 重新报数 1、2、3，问最后剩下的那个小孩儿的编号是多少?
 * @param {*} num 
 * @param {*} count 
 */
function childNum1(num, count) {
  let arr = [];
  for (let i = 1; i <= num; i++) {
    arr.push(i)
  }
  let counter = 0;
  let index = 0;
  while (arr.length > 1) {
    counter++
    if (counter === count) {
      counter = 0;
      arr.splice(index, 1)
    } else {
      if (index >= arr.length) {
        index = 0;
      } else {
        index++
      }

    }
  }
  return arr;
}
console.log(childNum1(30, 3))
 
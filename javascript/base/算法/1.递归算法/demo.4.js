/**
 * 斐波那契数列
 * 1、1、2、3、5、8、13、21、34
 */
function fib(n) {
  let result = {};
  function memory(i) {
    if (i < 1) {
      result[i] = 0;
      return 0;
    }
    for (var index = 0; index < i; index++) {
      if (index < 2) {
        result[index] = 1;
      } else {
        result[index] = result[index - 1] + result[index - 2];
      }
    }
  }
  memory(n);
  return result[n]
  // return Object.keys(result).map(key => result[key]);
}

// console.log(fib(0));
// console.log(fib(1));
// console.log(fib(2));
// console.log(fib(4));
console.time("fib");
fib(2000);
console.timeEnd("fib");


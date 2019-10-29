/**
 * 斐波那契数列
 * 1、1、2、3、5、8、13、21、34
 */
function fib(n) {
  let result = {};
  let count = 0;
  function memory(i) {
    count++;
    if (i < 1) {
      result[i] = 0;
      return 0;
    }
    if (i < 2) {
      result[i] = 1;
      return 1;
    }
    if (result[i]) {
      return result[i];
    } else {
      result[i - 1] = memory(i - 1);
      result[i - 2] = memory(i - 2);
      return result[i - 1] + result[i - 2];
    }
  }
  memory(n);
  console.log(count);
  return Object.keys(result).map(key => result[key]);
}

fib(0);
fib(1);
fib(2);
fib(4);
fib(2000);

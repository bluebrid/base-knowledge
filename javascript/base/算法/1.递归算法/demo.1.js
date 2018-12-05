/**
 * 斐波那契数列
 * 1、1、2、3、5、8、13、21、34
 */
function fib(n) {
    if (n < 1) {
        return 0;
    }
    if (n < 2) {
        return 1;
    }
    return fib(n-1) + fib(n - 2)
}

console.log(fib(0))
console.log(fib(1))
console.log(fib(2))
console.log(fib(4))
console.log(fib(100))
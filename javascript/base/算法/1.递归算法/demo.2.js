/**
 * 斐波那契数列
 * 1、1、2、3、5、8、13、21、34
 */
function fib(n) {
    let result = {}
    function memory(i) {
        if (i < 1) {
            result[n] = 0;
            return 0;
        }
        if (i < 2) {
            result[i] = 1
            return 1;
        }
        if (result[i]) {
            return result[i];
        } else {
            result[i - 1] = memory(i - 1);
            result[i - 2] = memory(i - 2);
            return result[i - 1] + result[i - 2]
        }
    }
    memory(n)
    return Object.keys(result).map(key => result[key])

}

console.log(fib(0))
console.log(fib(1))
console.log(fib(2))
console.log(fib(4))
console.log(fib(100))
/**
 * https://segmentfault.com/a/1190000007535316
 * https://segmentfault.com/a/1190000017224799
 * http://www.ruanyifeng.com/blog/2015/05/async.html
 * https://github.com/rhinel/blog-word/issues/4
 */

async function async1() {
    console.log('async1 start')//(2)
    await async2() 
    /**
     * 1. await async2() 表达式是从右到左执行，也就是说先执行async2, 然后在执行await, 所以async2 是三个输出的
     * 2. await 关键字会让出线程，阻塞代码的执行：所谓的阻塞代码的执行，就是await async2() 之后的代码都会被阻塞不会立即执行
     * 让出线程，也就是说跳出async1方法，然后后面会执行var r1 = async1();之后的代码
     */
    console.log('async1 end')//(7)
}

async function async2() {
    console.log('async2')//(3)
}

console.log('script start')//(1)

setTimeout(function () {
    console.log('setTimeout')//(8)
}, 0)

var r1 = async1();
console.log(r1);// r1, 是一个Promise 对象，也就是async 的方法最终都是一个Promise 函数

new Promise(function (resolve) {
    console.log('promise1')//(4)// 这个是Promise 定义的方法，是同步的，只有then 里面的才是异步的，所以promise1是第四个输出
    resolve();
}).then(function () {
    console.log('promise2')//(6) 微task 线程处理的
})

console.log('script end')//(5) 主线程的宏task 执行完成了， 所以要执行微task , 也就是主要的promise,上面的(6)输出
/**
 * script start
 * async1 start
 * async2
 * promise1
 * script end
 * promise2
 * async1 end
 * setTimeout
 */
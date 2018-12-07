/**
 * http://liubin.org/promises-book/#introduction
 * https://www.zcfy.cc/article/the-best-resources-to-learn-about-javascript-promises-codeutopia-1040.html
 * http://www.cnblogs.com/dojo-lzz/p/4340897.html
 * http://coderlt.coding.me/2016/12/03/promise-in-depth-an-introduction-1/
 * http://es6.ruanyifeng.com/#docs/promise
 */
// new promise
let p1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve(100), 1000)
})
p1.then(
    v => console.log(v),
    err => console.log(err)
);
// resolve
let p2 = Promise.resolve(12)
p2.then(v => console.log(v))

// reject
let p3 = Promise.reject('reject')
p3.then(
    v => console.log(v),
    err => console.log(err)
)
// all
let p4 = Promise.all([p1, p2, p3]).then(
    v => console.log(v),
    err => console.log(err)
)
// race
Promise.race([p1, p2, p3, p4]).then(
    v => console.log(v),
    err => console.log(err)
)
async function async1() {
    console.log(1);
    await async2();

    console.log(2);
}
async function async2() {
    console.log(3);
}

async1();

setTimeout(() => console.log(4), 0); // setTimeout 的最小时长是4ms

new Promise((resolve) => {
    resolve();
    console.log(5);
}).then(() => {
    console.log(6);
    // for (let i = 0; i < 98800000000; i++) {

    // }
    Promise.resolve().then(() => {
        console.log(7);
    });
});

console.log(8); // 1 3 5 8 2 6 7 4 ? 为什么 7 比 4 先输出？
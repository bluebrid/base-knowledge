// 宏 1
console.log("1");

setTimeout(function () {
  // 宏2
  console.log("2");
  process.nextTick(function () {
    // 微2
    console.log("3");
  });
  new Promise(function (resolve) {
    // 宏2
    console.log("4");
    resolve();
  }).then(function () {
    // 微2
    console.log("5");
  });
});
process.nextTick(function () {
  // 微1
  console.log("6");
});
new Promise(function (resolve) {
  // 宏 1
  console.log("7");
  resolve();
}).then(function () {
  // 微1
  console.log("8");
});

setTimeout(function () {
  // 宏3
  console.log("9");
  process.nextTick(function () {
    // 微3
    console.log("10");
  });
  new Promise(function (resolve) {
    // 宏3
    console.log("11");
    resolve();
  }).then(function () {
    // 微3
    console.log("12");
  });
});

// 这里需要考虑，微任务追加的顺序，
Promise.resolve().then(() => {
  console.log(1)
}).then(() => {
  console.log(3)
  return Promise.resolve(3.5)
}).then(() => {
  console.log(5)
}).then(() => {
  console.log(7)
})

Promise.resolve().then(() => {
  console.log(2)
}).then(() => {
  console.log(4)
}).then(() => {
  console.log(6)
}).then(() => {
  console.log(8)
})

// 微任务如果接着有微任务，则直接插入队列继续执行
console.log(1)
setTimeout(() => {
    console.log('宏任务')
})
Promise.resolve().then(() => { // f1
    console.log('微任务1')
    Promise.resolve().then(() => { // f2 插队
        console.log('微任务2')
    })
}).then(() => { // f3
    console.log('微任务3')
})
// 输出： 1 -> 微任务1-> 微任务2 -> 微任务3 -> 宏任务
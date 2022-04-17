console.log("1"); // 宏 1
// 一个宏任务执行完成后（只从宏任务队列取一个宏任务处理）， 就会执行执行微任务 
// 所有两个setTimeout 是两个宏任务
setTimeout(function () {
  console.log("2");// 宏 2
  // process.nextTick(function () {
  //   console.log("3"); // 微2
  // });
  new Promise(function (resolve) {
    console.log("4");// 宏 2
    resolve();
  }).then(function () {
    console.log("5"); // 微2
  });
});
// process.nextTick(function () {
//   console.log("6"); //微1
// });
new Promise(function (resolve) {
  console.log("7"); // 宏 1
  resolve();
}).then(function () {
  console.log("8"); //微1
});

setTimeout(function () {
  console.log("9"); // 宏 3
  // process.nextTick(function () {
  //   console.log("10");  // 微 3
  // });
  new Promise(function (resolve) {
    console.log("11");  // 宏 3
    resolve();
  }).then(function () {
    console.log("12"); // 微 3
  });
});

// 1 7 6 2 4 9 11 3 5  8 10 112
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
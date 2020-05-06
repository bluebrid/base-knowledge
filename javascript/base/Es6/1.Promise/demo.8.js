const Promise = require("./promise");
Promise.enableSynchronous();
var promise = new Promise(function(resolve, reject) {
  // setTimeout(() => {
  //     resolve(1000)
  // }, 1000 * 4)
  resolve(1000);
});
promise
  .then(
    data => {
      console.log("result: " + data);
    },
    errMsg => {
      console.log("Error message: " + errMsg);
    }
  )
  .then(
    data2 => {
      console.log("result2:" + data2);
    },
    errMsg2 => console.log("Error message 2:" + errMsg2)
  )
  .then(
    data3 => {
      console.log("result3:" + data3);
    },
    errMsg3 => console.log("Error message 3:" + errMsg3)
  );
//   .finally(() => { // finally 的callback 不会传入任何的参数
//     console.log("finally====================");
//   })
//   .then(
//     data => {
//       console.log("after finally result: " + data);
//     },
//     errMsg => {
//       console.log("after finally Error message: " + errMsg);
//     }
//   )
//   .done(
//     data => {
//       console.log("done result: " + data);
//     },
//     errMsg => {
//       console.log("done Error message: " + errMsg);
//     }
//   )
/*
  .then(
    data => {
      console.log("after done result: " + data);
    },
    errMsg => {
      console.log("after done Error message: " + errMsg);
    }
  )*/
// console.log(promise.getState());

const Promise = require("./promise");
Promise.enableSynchronous()
var promise = new Promise(function(resolve, reject) {
    // setTimeout(() => {
    //     resolve(1000)
    // }, 1000 * 4)
    resolve(1000)
});
promise.then( data => {
    console.log('result: ' + data)
}, errMsg => {
    console.log('Error message: ' + errMsg)
}).then( (data2) => {
    console.log('result2:' + data2)
}, errMsg2 => console.log('Error message:' + errMsg2))
console.log(promise.getState())

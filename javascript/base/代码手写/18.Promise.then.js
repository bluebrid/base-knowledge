Promise.prototype.then = function (onFulfilled, onReject) {
    // 保存前一个promise的this
    const self = this;
    return new Promise((resolve, reject) => {
        // 封装前一个promise成功时执行的函数
        let fulfilled = () => {
            try {
                const result = onFulfilled(self.value); // 承前
                return result instanceof MyPromise ? result.then(resolve, reject) : resolve(result); //启后
            } catch (err) {
                reject(err)
            }
        }
        // 封装前一个promise失败时执行的函数
        let rejected = () => {
            try {
                const result = onReject(self.reason);
                return result instanceof MyPromise ? result.then(resolve, reject) : reject(result);
            } catch (err) {
                reject(err)
            }
        }
        switch (self.status) {
            case PENDING:
                self.onFulfilledCallbacks.push(fulfilled);
                self.onRejectedCallbacks.push(rejected);
                break;
            case FULFILLED:
                fulfilled();
                break;
            case REJECT:
                rejected();
                break;
        }
    })
}

new Promise((resolve, reject) => {
    console.log('1')
    resolve(1111)
}).then((val) => {

}, (error) => {

})
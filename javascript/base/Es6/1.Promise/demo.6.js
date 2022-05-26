/**
 * https://juejin.im/post/5b1e9c8e6fb9a01e273119b2
 * demo.5.js 已经实现了基本的promise
 * 我们接下来实现其相关的两个静态方法： resolve, reject
 * Promise.resolve(data)
 * Promise.reject(err) 
 */
function resolvePromise(promise2, newValue, resolve, reject, status) {
    if (newValue instanceof Promise) {
        let called
        try {
            let then = newValue.then
            if (typeof then === 'function') {
                then.call(newValue,
                    data => {
                        if (called) return;
                        called = true
                        resolve(data)
                    },
                    err => {
                        if (called) return;
                        called = true
                        reject(err)
                    })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return;
            called = true
            reject(e)
        }
    } else {
        if (status === promise2.allStatus.RESOLVE) {
            resolve(newValue);
        } else if (status === promise2.allStatus.REJECT) {
            reject(newValue);
        }
    }
}
class Promise {
    constructor(executor) {
        this.allStatus = {
            PENDDING: 'pendding',
            RESOLVE: 'resolve',
            REJECT: 'reject'
        }
        this.status = this.allStatus.PENDDING // 保存状态
        this.value = undefined // 保存值
        this.reason = undefined // 保存reject 的原因
        // 用来保存异步调用时，resolve 和 reject 的回调函数的
        this.onResovleCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = data => {
            if (this.status === this.allStatus.PENDDING) {
                this.status = this.allStatus.RESOLVE
                this.value = data
                // 需要去遍历onResovleCallbacks
                this.onResovleCallbacks.forEach(fn => fn())
            }

        }
        let reject = error => {
            if (this.status === this.allStatus.PENDDING) {
                this.status = this.allStatus.REJECT
                this.reason = error
                // 需要去遍历onResovleCallbacks
                this.onRejectedCallbacks.forEach(fn => fn())
            }

        }
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    then(onFufilled, onRejected) {
        onFufilled = typeof onFufilled === 'function' ? onFufilled : y => y
        onRejected = typeof onRejected === 'function' ? onRejected : err => {
            throw err;
        }
        let promise2;// 链式调用， then 方法，需要返回一个新的promise 的对象
        promise2 = new Promise((resolve, reject) => {
            if (this.status === this.allStatus.RESOLVE) {
                setTimeout(() => {
                    try {
                        resolvePromise(promise2, onFufilled(this.value), resolve, reject, this.status)
                    } catch (e) {
                        reject(e);
                    }
                })

            } else if (this.status === this.allStatus.REJECT) {
                setTimeout(() => {
                    try {
                        resolvePromise(promise2, onRejected(this.reason), resolve, reject, this.status)

                    } catch (e) {
                        reject(e);
                    }
                })

            } else if (this.status === this.allStatus.PENDDING) { // 因为then 方法是同步调用的, 但是如果是异步调用resolve reject ,
                setTimeout(() => {
                    this.onResovleCallbacks.push(() => {
                        try {
                            resolvePromise(promise2, onFufilled(this.value), resolve, reject, this.status)
                        } catch (e) {
                            reject(e);
                        }
                    })
                    this.onRejectedCallbacks.push(() => {
                        try {
                            resolvePromise(promise2, onRejected(this.reason), resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    })
                })

            }
        })
        return promise2;
    }
}

Promise.resolve = (data) => {
    return new Promise ((resolve, reject) => {
        resolve(data)
    })
}

Promise.reject = (err) => {
    return new Promise ((resolve, reject) => {
        reject(err)
    })
}


Promise.resolve(1000)
.then((data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
        resolve(data + ' world')
    })
}, (err) => {
    console.log(err)
}).then((data) => {
    console.log(data)
}, (err) => {
    console.log('🙅' + err)
})

Promise.reject('reject message')
.then((data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
        resolve(data + ' world')
    })
}, (err) => {
    console.log(err)
}).then((data) => {
    console.log(data)
}, (err) => {
    console.log('🙅' + err)
})
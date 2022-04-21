/**
 * https://juejin.im/post/5b1e9c8e6fb9a01e273119b2
 * demo.5.js 已经实现了基本的promise
 * 我们接下来实现其相关的两个静态方法： all, race
 * Promise.all([p1, p2...])
 * Promise.race([p1, p2...]) 
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
    return new Promise((resolve, reject) => {
        resolve(data)
    })
}

Promise.reject = (err) => {
    return new Promise((resolve, reject) => {
        reject(err)
    })
}

Promise.all = (ps) => {
    let promises = [];
    if (Object.prototype.toString.call(ps) === '[object Array]') {
        promises = ps
    } else {
        promises = [promises]
    }
    let result = Array(promises.length)
    let total = 0;
    return new Promise((resolve, reject) => {
        setTimeout(() => { // 需要用setTimeout ，先调用then 方法， 将挂载在onResovleCallbacks上
            promises.forEach((p, i) => {
                p.then(
                    data => {
                        total++
                        result[i] = data
                        if (total == promises.length) {
                            resolve(result)
                        }
                    },
                    err => {
                        reject(err)
                    }
                )
            })
        })
    })
}

Promise.race = (ps) => {
    let promises = [];
    if (Object.prototype.toString.call(ps) === '[object Array]') {
        promises = ps
    } else {
        promises = [promises]
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            promises.forEach((p, i) => {
                p.then(
                    data => {
                        resolve(data);
                    },
                    err => {
                        reject(err)
                    }
                )
            })
        })

    })
}

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 1000 * 3)
})
let p2 = Promise.resolve(2)
let p3 = Promise.resolve(3)
let p4 = Promise.resolve(4)

Promise.all([p1, p2, p3, p4])
    .then(
        data => {
            console.log(data)
        },
        err => {
            console.log(err)
        }
    )

let p5 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(5)
    }, 1000)
})
let p6 = Promise.resolve(6)
let p7 = Promise.resolve(7)
let p8 = Promise.reject('race error msg')

Promise.race([p5, p6, p7, p8])
    .then(
        data => {
            console.log(data)
        },
        err => {
            console.log(err)
        }
    )
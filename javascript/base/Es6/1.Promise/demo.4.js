/**
 * https://juejin.im/post/5b1e9c8e6fb9a01e273119b2
 * 我们需要来实现链式调用,
 * 链式调用，就是在then 中返回一个新的promise
 * 如果第一个promise返回一个普通值，直接将这个返回值，传递给下一次then的resolve。
 * 如果第一个promise返回一个promise，需要等待返回的这个promise执行后的结果，传给下一次then
 * 处理第一次promise执行后的返回值x，then方法的每个状态都需要处理一下：
 * 
 */
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
                try {
                    let newValue = onFufilled(this.value)
                    resolve(newValue)
                } catch (e) {
                    reject(e);
                }

            } else if (this.status === this.allStatus.REJECT) {
                try {
                    let newValue = onRejected(this.reason)
                    resolve(newValue)
                } catch (e) {
                    reject(e);
                }
            } else if (this.status === this.allStatus.PENDDING) { // 因为then 方法是同步调用的, 但是如果是异步调用resolve reject ,
                this.onResovleCallbacks.push(() => {
                    try {
                        let newValue = onFufilled(this.value)
                        resolve(newValue)
                    } catch (e) {
                        reject(e);
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    try {
                        let newValue = onRejected(this.reason)
                        resolve(newValue)
                    } catch (e) {
                        reject(e);
                    }
                })
            }
        })
        return promise2;
    }
}

let promise = new Promise((resolve, reject) => {
    resolve('hello')
})
promise.then((data) => {
    console.log(data)
    return `sssss`
}, (err) => {
    console.log(err)
}).then((data) => {
    console.log(data)
}, (err) => {
    console.log('🙅' + err)
})


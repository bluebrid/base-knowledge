/**
 * https://juejin.im/post/5b1e9c8e6fb9a01e273119b2
 * 我们首先实现一个异步调用的Promise,但不是链式的
 */
class newPromise {
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
        if (this.status === this.allStatus.RESOLVE) {
            onFufilled(this.value)
        } else if (this.status === this.allStatus.REJECT) {
            onRejected(this.reason)
        } else if (this.status === this.allStatus.PENDDING) { // 因为then 方法是同步调用的
            this.onResovleCallbacks.push(() => {
                onFufilled(this.value)
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason)
            })
        }
    }
}

new newPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1000)
    })
}).then(
    value => console.log(value),
    err => console.log(err)
)

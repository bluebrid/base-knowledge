/**
 * https://juejin.im/post/5b1e9c8e6fb9a01e273119b2
 * 我们首先实现一个同步调用的Promise,而且不是链式的
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

        let resolve = data => {
            if (this.status === this.allStatus.PENDDING) {
                this.status = this.allStatus.RESOLVE
                this.value = data
            }

        }
        let reject = error => {
            if (this.status === this.allStatus.PENDDING) {
                this.status = this.allStatus.REJECT
                this.reason = error
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
        }
    }
}

new newPromise((resolve, reject) => {
    reject(1000)
}).then(
    value => console.log(value),
    err => console.log(err)
)

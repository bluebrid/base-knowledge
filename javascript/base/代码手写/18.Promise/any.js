
/**
 * Any 表示只要任何其中一个返回成功，则是成功的， 并且返回第一个成功的值，需要判断所有的中间是否有成功的
 * Race， 表示，只要任何一个谁先成功或者失败，则返回成功或失败
 * @param {*} args 
 */
Promise.any = (args) => {
    const promises = Array.isArray(args) ? args : [args]
    return new Promise((resolve, reject) => {
        const len = promises.length;
        let count = 0;
        promises.forEach((p, index) => {
            p.then((val) => {
                resolve(val)
            }, (err) => {
                count++;
                if (count === len) {
                    reject(err)
                }
            })
        })
    })
}
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 2000)
})


const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(2)
    }, 500)
})


const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(3)
    }, 800)
})


const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('errorMsg p4')
    }, 700)
})

Promise.any([p1, p2, p3, p4]).then((val) => {
    console.log(val)
}, (err) => {
    console.log('err:',err)
})
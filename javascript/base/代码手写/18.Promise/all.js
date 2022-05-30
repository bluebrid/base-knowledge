Promise.all = function (args) {
    const promises = Array.isArray(args) ? args : [args]
    return new Promise((resolve, reject) => {
        const len = promises.length
        let count = 0;
        let result = new Array(len)
        promises.forEach((p, index) => {
            p.then((val) => {
                result[index] = val
                count++;
                if (count === len) {
                    resolve(result)
                }
            }, (err) => {
                reject(err)
            })
        })
    })

}

const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 1000)
})


const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2)
    }, 500)
})


const p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3)
    }, 800)
})


const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('errorMsg p4')
    }, 700)
})

Promise.all([p1, p2, p3, p4]).then((val) => {
    console.log(val)
}, (err) => {
    console.log(err)
})
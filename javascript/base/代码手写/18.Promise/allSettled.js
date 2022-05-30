
Promise.allSettled = function (args) {
    const promises = Array.isArray(args) ? args : [args]
    return new Promise((resolve, reject) => {
        const len = promises.length;
        let count = 0;
        const result = new Array(len)
        const callBack = () => {
            count++
            if (count === len) {
                resolve(result)
            }
        }
        promises.forEach((p, index) => {
            p.then((val) => {
                result[index] = {
                    status: 'fullfilled',
                    value: val
                }
                callBack()
            }, (err) => {
                result[index] = {
                    status: 'reject',
                    season: err
                }
                callBack()
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

Promise.allSettled([p1, p2, p3, p4]).then((val) => {
    console.log(val)
}, (err) => {
    console.log(err)
})
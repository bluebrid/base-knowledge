Promise.race = function(args) {
    const promises = Array.isArray(args) ? args : [args]
    return new Promise((resolve, reject) => {
        promises.forEach(p => {
            p.then((val) => {
                resolve(val)
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

Promise.race([p1, p2, p3, p4]).then((val) => {
    console.log(val)
}, (err) => {
    console.log(err)
})
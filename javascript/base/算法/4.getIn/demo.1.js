var obj = {
    a: 1,
    b: 2,
    c: {
        d: {
            c: 5,
            e: 3
        },
        f: 4
    }
}

Object.prototype.getIn1 = function (...args) {
    if (args.length < 1) {
        return this;
    }
    let index = 0
    let result = undefined

    while (index < args.length) {
        if (index === 0) {
            result = this
        }
        if (result[args[index]]) {
            result = result[args[index]]
            index++
        } else {
            result = undefined
            break
        }
    }
    return result
}
// console.log(obj.getIn('a'))
// console.log(obj.getIn('c', 'd'))
// console.log(obj.getIn('a', 'f'))
// console.log(obj.getIn('c', 'd', 'c'))

Object.prototype.getIn = function (key) {
    if (!key) {
        return this
    }
    const keys = key.split('.')
    const getValueByKey = (tempObj, k) => {
        if (tempObj[k] !== undefined) {
            return tempObj[k]
        }
    }
    return keys.reduce((result, k) => {
        if (result) {
            result = getValueByKey(result, k)
        }
        return result
    }, this)
}

console.log(obj.getIn('a'))
console.log(obj.getIn('c'))
console.log(obj.getIn('c.d'))
console.log(obj.getIn('c.f'))
console.log(obj.getIn('c.d.c'))

let str = "_abc_word good"
const result = str.replace(/([^a-z]+)(\w)/g, ($m, $1, $2) => {
    return   $2.toUpperCase()
})
console.log(result)

console.log(new Date().getFullYear())
console.log(new Date().get())
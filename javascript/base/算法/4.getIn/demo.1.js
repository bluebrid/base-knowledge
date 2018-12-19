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

Object.prototype.getIn = function (...args) {
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
console.log(obj.getIn('a'))
console.log(obj.getIn('a', 'f'))
console.log(obj.getIn('c', 'd', 'c'))
let obj = {
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case 'number':
                return 123;
            case 'string':
                return 'str';
            case 'default':
                return 'default';
            default:
                throw new Error();
        }
    }
};

console.log(2 * obj) // 246
console.log(3 + obj) // '3default'
console.log(obj == 'default') // true
console.log(String(obj)) // 'str'

const add = function () {
    let args = [...arguments]
    let func = function () {
        args.push(...arguments)
        return func
    }
    func.valueOf = () => {
        const result = args.reduce((total, item) => {
            total = total + item
            return total
        }, 0)
        return result;
    }
    return func
}

console.log(add(1) == 1)
console.log(add(1, 2) == 3)
console.log(add(1, 2)(3) == 6)
console.log(add(1)(2, 3)(3) == 9)
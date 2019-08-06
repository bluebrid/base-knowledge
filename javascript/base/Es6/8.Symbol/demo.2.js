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
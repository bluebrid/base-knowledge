class MyClass {
    [Symbol.hasInstance](obj) {
        return obj instanceof Array
    }
}

console.log([1, 2, 3] instanceof new MyClass())

class Even {
    static [Symbol.hasInstance](obj) {
        return Number(obj) % 2 === 0;
    }
}

// // 等同于
// const Even = {
//     [Symbol.hasInstance](obj) {
//         return Number(obj) % 2 === 0;
//     }
// };
1 instanceof Even // false
2 instanceof Even // true
12345 instanceof Even // false
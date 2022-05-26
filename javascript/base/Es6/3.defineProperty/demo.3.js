/**
 * https://www.jianshu.com/p/2df6dcddb0d7
 * 1. Object.defineProperty 不能劫持数组的处理
 * 2. Object.defineProperty 不能劫持属性是对象的属性
 */

function archiver(obj) {
    var _store = {}
    var arrayNewPrototype = []
    var arrayMethods = ['push', 'pop', 'shift', 'unshift']
    arrayMethods.forEach(m => {
        let original = Array.prototype[m]
        arrayNewPrototype[m] = function (...args) {
            console.log(`Call ${m}`)
            return original.call(this, args.length > 0 ? args[0] : undefined);
        }
    })
    Object.keys(obj).forEach(key => {
        if (key != '_sotre') {
            if (Array.isArray(obj[key])) {
                obj[key].__proto__ = arrayNewPrototype
            } else {
                Object.defineProperty(obj, key, {
                    get() {
                        return _store[key]
                    },
                    set(value) {
                        console.log(`set ${key} to ${value}`)
                        _store[key] = value
                    }
                })
            }

        }
    })
    return obj
}
var numericDataStore = {
    amount: 1234,
    total: 14,
    arr: [],
    user: {
        name: 'ivan',
        age: 18
    }
};
numericDataStore = archiver(numericDataStore)
numericDataStore.amount = 111
console.log(numericDataStore.amount)
numericDataStore.arr.push(1);
numericDataStore.arr.push(2);
console.log(numericDataStore.arr)
numericDataStore.user.name = 'ivan fan'
console.log(numericDataStore.user.name)
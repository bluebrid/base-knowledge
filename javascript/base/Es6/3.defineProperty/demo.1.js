/**
 * https://www.jianshu.com/p/2df6dcddb0d7
 * 1. Object.defineProperty 不能劫持数组的处理
 * 2. Object.defineProperty 不能劫持属性是对象的属性
 */

function archiver(obj) {
    var _store = {}

    Object.keys(obj).forEach(key => {
        if (key != '_sotre') {

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
    })
    return obj
}
var numericDataStore = {
    amount: 1234,
    total: 14
};
numericDataStore = archiver(numericDataStore)
numericDataStore.amount = 111
console.log(numericDataStore.amount)

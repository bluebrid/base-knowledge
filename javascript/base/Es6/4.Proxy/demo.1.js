
let numericDataStore = {
    amount: 1234,
    total: 14
};

Object.defineProperty(numericDataStore, 'count', {
    get() {
        return 123
    },
    set(value) {
        if (typeof value !== 'number') {
            throw Error("Properties in numericDataStore can only be numbers");
        }
        return value
    }
})
numericDataStore.count = '111'
console.log(numericDataStore.count)
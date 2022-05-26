/**
 * https://zcfy.cc/article/6-compelling-use-cases-for-es6-proxies-888.html
 */
let numericDataStore = {
    count: 0,
    amount: 1234,
    total: 14
};

numericDataStore = new Proxy(numericDataStore, {
    set(target, key, value, proxy) {
        if (typeof value !== 'number') {
            throw Error("Properties in numericDataStore can only be numbers");
        }
        return Reflect.set(target, key, value, proxy);
    }
});

// 这会抛出异常
numericDataStore.count = "foo";

// 这会设置成功
numericDataStore.count = 333;
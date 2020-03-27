const cacheTarget = (target, ttl = 60) => {
    const CREATED_AT = Date.now();
    const isExpired = () => (Date.now() - CREATED_AT) > (ttl * 1000);
    const handler = {
        get: (target, prop) => isExpired() ? undefined : target[prop]
    };
    return new Proxy(target, handler)
};

const cache = cacheTarget({age: 25}, 5);

console.log(cache.age);

setTimeout(() => {
    console.log(cache.age)
}, 6 * 1000);
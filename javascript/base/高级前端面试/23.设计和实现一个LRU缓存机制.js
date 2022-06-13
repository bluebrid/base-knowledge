class LURCache {
    constructor(limit) {
        this.queue = []
        this.limit = limit
    }
    put(key, value) {
        if (this.queue.length === this.limit) {
            this.queue.pop() // 移除最后一个
        }
        this.queue.unshift({
            key,
            value
        }) // 放到第一位
    }
    get(key) {
        const item = this.queue.find(item => item.key === key)
        if (!item) return -1 // 没有找到
        const index = this.queue.findIndex((item) => item.key === key)
        this.queue.splice(index, 1)
        this.queue.unshift(item) // 放到第一位
        return item.value
    }
}

const cache = new LURCache(2)
cache.put(1, 1)
cache.put(2, 2)
console.log(cache.get(1))
cache.put(3, 3)
console.log(cache.get(2))
cache.put(4, 4)
console.log(cache.get(1))
console.log(cache.get(3))
console.log(cache.get(4))
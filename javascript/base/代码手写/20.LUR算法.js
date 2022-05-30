class LRUCache1 {
    constructor(size) {
        this.size = size
        this.cache = new Map()
    }
    get(key) {
        const hasKey = this.cache.has(key)
        if (!hasKey) {
            return -1
        } else {
            const val = this.cache.get(key)
            this.cache.delete(key)
            this.cache.set(key, val)
            return val
        }
    }
    put(key, value) {
        const hasKey = this.cache.has(key)
        if (hasKey) {
            this.cache.delete(key)
        }
        this.cache.set(key, value)
        if (this.cache.size > this.size) {
            this.cache.delete(this.cache.keys().next().value)
        }
    }
}
class LURCache {
    constructor(size) {
        this.size = size;
        this.map = []
    }
    _findIndex(key) {
        return this.map.findIndex((item) => {
            return item.key === key
        })
    }
    put(key, val) {
        const index = this._findIndex(key)
        if (index > -1) { // 已经存在的情况，修改对应的值，而且应该是最近用过了， 应该放到队列前面
            this.map.splice(index, 1)
            this.map.unshift({
                key,
                val
            })
        } else {
            if (this.map.length >= this.size) {
                this.map.pop()
            }
            this.map.unshift({
                key,
                val
            })
        }
    }
    get(key) {
        const index = this._findIndex(key)
        if (index > -1) {
            const temp = this.map[index]
            this.map.splice(index, 1)
            this.map.unshift(temp)
            return temp.val
        }
        return -1; // 不存在返回-1
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


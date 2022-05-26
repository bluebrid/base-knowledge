
//LRU 是 Least Recently Used 的缩写，即最近最少使用，是一种常用的页面置换算法，将最近最久未使用的页面予以淘汰。
// 核心的思想就是“如果数据最近被访问，那么将来被访问的几率也就更高”。
class Item {
    constructor(key, value) {
        this._key = key
        this._value = value
        this.lastReadTime = Date.now()
    }
    set key(key) {
        this._key = key
    }
    get key() {
        this.lastReadTime = Date.now()
        return this._key
    }
    get value() {
        return this._value
    }
    set value(value) {
        this._value = value
        this.lastReadTime = Date.now()
    }
}

class LRUCache {
    constructor(size) {
        this.size = size
        this.cache = []
    }

    get(key) {
        var obj = this.cache.find(item => item.key === key)
        if (obj) {
            return obj.value
        }
        return -1
    }
    put(key, value) {

        var obj = this.cache.find(item => item.key === key)
        if (obj) {
            obj.value = value
        } else {
            if (this.cache.length >= this.size) {
                this.cache = this.cache.sort((pre, next) => pre.lastReadTime - next.lastReadTime)
                this.cache.shift()
            } 
            this.cache.push(new Item(key, value))
            
        }
    }
}

var cache = new LRUCache(2)

cache.put(1, 1);
cache.put(2, 2);
cache.put(3, 3);
console.log(cache.cache)
console.log(cache.get(1));       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
console.log(cache.cache)
cache.get(2);       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
cache.get(1);       // 返回 -1 (未找到)
cache.get(3);       // 返回  3
cache.get(4);       // 返回  4
console.log(cache)
cache.get(3);
console.log(cache)
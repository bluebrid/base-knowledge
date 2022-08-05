/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity
    this.equeue = []
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    const index = this._getIndex(key)
    if (index < 0) return -1
    const item = this.equeue[index]
    this.equeue.splice(index, 1)
    this.equeue.unshift(item)
    return item.value
};

LRUCache.prototype._getIndex = function (key) {
    return this.equeue.findIndex((item) => {
        return item.key === key
    })

}
/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
    const index = this._getIndex(key)
    const item = {
        key, value
    }
    if (index >= 0) {
        this.equeue.splice(index, 1)
        this.equeue.unshift(item)
        return
    }
    if (this.equeue.length < this.capacity) {
        this.equeue.unshift(item)
        return;
    }
    this.equeue.pop()
    this.equeue.unshift(item)
    return

};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

let lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4

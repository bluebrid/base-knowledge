
class Queue {
  constructor() {
    this.items = []
  }
  // 入队
  enqueue(item) {
    this.items.push(item)
  }
  // 出队
  dequeue() {
    this.items.shift(); // 先进先出
  }
  // 获取队首元素
  head() {
    return this.items[0]
  }
  // 获取队尾元素
  tail() {
    return this.items[this.item.length - 1]
  }
  clear() {
    this.items = []
  }
  size() {
    return this.items.length
  }
  isEmpty() {
    return !!this.item.length
  }
}
module.exports = Queue
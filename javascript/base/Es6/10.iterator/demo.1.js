var obj = { x: 1, y: 2, z: 4 };
// https://juejin.im/post/5d2d146bf265da1b9163c5c9#heading-0
obj[Symbol.iterator] = function() {
  // iterator 是一个具有具有 next 方法的对象，
  // 它的返回至少有一个对象
  // 两个属性：value＆done。

  // 返回一个 iterator 对象
  const keys = Object.keys(this);
  const _this = this;
  return {
    next: function() {
      this.objectIndex ++;
      return {
        value: _this[keys[this.objectIndex]],
        done: this.objectIndex >= keys.length
      };
    },
    objectIndex: -1,
    _this: this
  };
};
var iterator = obj[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log([...obj]);
for(let item of obj) {
  console.log(item)
}

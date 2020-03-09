//koala.js
let a = '程序员成长指北';

console.log(module.exports); //能打印出结果为：{}
console.log(exports); //能打印出结果为：{}
// 一开始exports指向的就是module.exports的内存，如果直接通过exports 进行赋值，
//也就是将exports的内存的指向和module.exports的指向给断开了。
// 再次给exports.a进行赋值，其实module.exports的值是没有变更的
exports = "一开始指向其他的内存"
exports.a = '程序员成长指北哦哦'; //这里辛苦劳作帮 module.exports 的内容给改成 {a : '程序员成长指北哦哦'}

exports = '指向其他内存区'; //这里把exports的指向指走

module.exports = {
    a: "这是module.exports维护的a的值"
}
/**
 * require导出的内容是module.exports的指向的内存块内容，并不是exports的。
 * 简而言之，
 * 区分他们之间的区别就是 exports 只是 module.exports的引用，辅助后者添加内容用的。
 * 用内存指向的方式更好理解。
 */
/*
1. 在node中每个文件模块都是一个如下的对象
function Module(id, parent) {
    this.id = id;
    this.exports = {};
    this.parent = parent;
    this.filename = null;
    this.loaded = false;
    this.children = [];
  }
  
  module.exports = Module;
  
  var module = new Module(filename, parent);
  2. 所有的模块都是 Module 的实例。可以看到，当前模块（module.js）也是 Module 的一个实例
 */
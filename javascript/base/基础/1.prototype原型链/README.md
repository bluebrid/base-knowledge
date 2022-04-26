https://github.com/qq449245884/xiaozhi/issues/

[深入理解JavaScript系列（10）：JavaScript核心（晋级高手必读篇）](https://www.cnblogs.com/TomXu/archive/2012/01/12/2308594.html)

[腾讯前端面试篇和详细题解](https://www.jianshu.com/p/35a027c7e4d9)

1. 在JavaScript中是使用<font color="red">构造函数</font>来新建一个对象的，每一个构造函数的内部都有一个<font color="red">prototype</font>属性
2. 当用构造函数去创建也给新的对象的时候，这个对象的内部指针(<font color="red">__proto__</font>)指向构造函数的<font color="red">prototype</font>
3. 再Es5中，新增了一个Object.getPrototypeOf()方法来获取对象的原型
```javascript
function myNew(){
  let target = {};
  const [ctor, ...args] = [...arguments]
  target.__proto__ = cotr.prototype // 这个是关键
  const result = ctor.call(target, args)
  if (typeof result === 'Object' || typeof result === 'function') {
    return result;
  }
  return target
}
function Person(name, age) {
  this.name = name;
  this.age = age;
}
myNew(Person, 'ivan', 18)
```
4. JavaScript 对象是通过引用来传递的，创建的每个新对象实体中并没有一份属于自己的原型副本。当修改原型时，与之相关的对象也会继承这一改变。
5. 原型链的尽头一般来说是``null`
6.  
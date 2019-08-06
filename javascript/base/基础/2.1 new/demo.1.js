function _new() {
  // 1. 创建一个空对象
  let target = {};
  // 2. 取出构造函数和参数，调用方式是：let person =  _new(Person, age, name)
  let [ctor, ...args] = [...arguments];
  // 3. 将第一步创建的空对象的原型指向构造函数Person
  target.__proto__ = ctor.prototype;
  // 4. 执行构造函数，并且将this 指向target
  let result = ctor.apply(target, args);
  // 5. 判断result 返回的是否一个对象或者函数
  if (result && (typeof result == 'object' || typeof result == 'function')) {
    return result;
  }
  return target;
}

function Person (name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function () {
  console.log(`My name is ${this.name}, age is ${this.age}`)
}

Person.prototype.growth = function() {
  this.age ++;
  console.log(`My name is ${this.name}, i have grow old one year, age is ${this.age}`)
}

var p1 = _new(Person, 'ivan', 22);
p1.say();
p1.growth();
p1.say();
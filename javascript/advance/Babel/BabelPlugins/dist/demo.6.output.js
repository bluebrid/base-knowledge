Person.prototype.sayHi = function (msg) {
  console.log(`Hi ${msg}, My name is ${name}, i'm ${age} old `);
}

Person.prototype.eat = function (food) {
  console.log(`I'm eating ${food}`);
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

// 1. 实现一个call函数
Function.prototype.newCall = function(...args) {
  let context = args[0] || {};
  let parms = args.splice(1);
  context.fn = this;
  context.fn(...parms);
  delete context.fn;
};

// 2. 实现一个apply函数
Function.prototype.newApply = function(...args) {
  let context = args[0] || {};
  let parms = args[1] || [];
  console.log(parms);
  context.fn = this;
  context.fn(...parms);
  delete context.fn;
};

// 3. 实现一个bind函数
Function.prototype.newBind = function(...args) {
  let context = args[0] || {};
  return (...parms) => {
    context.fn = this;
    context.fn(...parms);
    delete context.fn;
  };
};
function func(a, b) {
  console.log(this.name, a, b);
}

let context = {
  name: "ivan fan",
  age: 18
};

// func.newCall(null, 1, 2);
// func.newApply(context, [1, 2])
// let bindFunc = func.newBind(context)
// bindFunc(1, 2)
// 4. instanceof的原理
function customInstanceOf(lobj, robj) {
  if (robj === null || robj === undefined) {
    throw Error("右边的操作符不能是null or undefinded");
  }
  let rightProto = robj.prototype;
  let leftProto = lobj.__proto__;
  while (true) {
    if (leftProto === null) {
      return false;
    }
    if (rightProto === leftProto) {
      return true;
    }
    leftProto = leftProto.__proto__;
  }
}

// console.log(customInstanceOf([], Array))

// console.log(customInstanceOf(1, Array))

// console.log(customInstanceOf(new func(), func))
// 5. Object.create的基本实现原理
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.say = function() {
  console.log(`My name is ${this.name}, age is ${this.age}`);
};
Object.prototype.newCreate = function(propto, descripter) {
  function F() {}
  F.prototype = propto;
  Object.defineProperties(propto, descripter);
  return new F();
};
var ivan = new Person("ivan fan", 18);
var obj = Object.newCreate(ivan, {
  a: {
    value: 1
  },
  b: {
    value: 2
  }
});

// console.log(obj)

// 6. new本质

function customNew(...args) {
  if (args[0] == null) {
    throw Error("new 操作的对象不能为null or undefined");
  }
  var proto = args[0];
  var parms = args.splice(1);
  var obj = {};
  obj.__proto__ = proto.prototype;
  proto.call(obj, ...parms);
  return obj;
}
var ivan01 = customNew(Person, "ivan fan001", 18);
ivan01.say();

// 7. 实现一个基本的Promise

// 8. 实现浅拷贝

var cloneObj = {
  name: "ivan",
  age: 18
};

console.log(JSON.parse(JSON.stringify(cloneObj)));
Object.assign({}, cloneObj);
var copyObj = { ...cloneObj };

// 9. 实现一个基本的深拷贝

// 10. 使用setTimeout模拟setInterval
function customSetInterval(fn, time) {
  var setTimeoutHandler = function loop() {
    return setTimeout(function() {
      fn();
      loop();
    }, time);
  };
  loop();
  return setTimeoutHandler;
}

var intervalHandler = setInterval(function() {
  console.log("111111111111");
}, 1000);



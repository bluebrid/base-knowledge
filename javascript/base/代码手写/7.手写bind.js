<<<<<<< HEAD
Function.prototype.myBind = function () {
  const [proto, args ] = arguments;
  const _this = this;
  proto.fn = _this;
  return () => {
    proto.fn(...args)
    delete proto.fn
  }
}

function func(msg1, msg2) {
  console.log(msg1, msg2)
  console.log(this.name, this.age)
}
const obj = {
  name: 'ivan',
  age: 18
}
const bindFunc = func.myBind(obj, ['hello', 'world'] )
console.log(bindFunc)
bindFunc()
=======
Function.prototype.myBind = function () {
  const [proto, args ] = arguments;
  const _this = this;
  proto.fn = _this;
  return () => {
    proto.fn(...args)
    delete proto.fn
  }
}

function func(msg1, msg2) {
  console.log(msg1, msg2)
  console.log(this.name, this.age)
}
const obj = {
  name: 'ivan',
  age: 18
}
const bindFunc = func.myBind(obj, ['hello', 'world'] )
console.log(bindFunc)
bindFunc()
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d

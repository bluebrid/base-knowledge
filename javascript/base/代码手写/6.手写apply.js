Function.prototype.myApply = function () {
  const [proto, args] = arguments
  const _this = this;
  proto.fn = _this;
  proto.fn(...args)
  delete proto.fn
}

function func(msg1, msg2) {
  console.log(msg1, msg2)
  console.log(this.name, this.age)
}
const obj = {
  name: 'ivan',
  age: 18
}
func.myApply(obj, ['hello', 'world'] )


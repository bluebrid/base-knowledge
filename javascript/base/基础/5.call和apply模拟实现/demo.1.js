// func.call(this, parms)
Function.prototype.newCall = Function.prototype.newCall ||function () {
  let args = [].slice.call(arguments)
  let context = null
  let _this = this
  if (args.length > 0) {
    context = args[0]
  } 
  context = context || window
  let parms = args.slice(1)
  context.fn = _this
  context.fn(...parms)
  delete context.fn
}

function func(age, sex)  {
    console.log(this.name);
    console.log(age),
    console.log(sex);
}
const user = {
    name: 'ivan fan',
    age: 12,
    sex: 'male'
}
func.newCall(user, 22, 'm')
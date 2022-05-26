// func.call(this, parms)
Function.prototype.newApply = Function.prototype.newApply ||function () {
    let args = [].slice.call(arguments)
    let context = null
    let _this = this
    if (args.length > 0) {
      context = args[0]
    } 
    context = context || window
    let parms = args.length > 1 ? args[1] : []
    parms = Array.isArray(parms) ? parms : [parms];
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
  func.newApply(user, [22, 'm'])
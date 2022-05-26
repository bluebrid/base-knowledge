// 
/**
 * let newFunc = func.newBind(this, p1, p2)
 * newFunc()
 */
Function.prototype.newBind = Function.prototype.newBind || function () {
    let fn = this;
    let args = [].slice.call(arguments);
    let context = null;
    if (args.length > 0) {
        context = args[0];
    }
    let parms = args.slice(1);
    context = context || window;
    context.fn = fn;
    return () => {
        let result = context.fn(... parms);
        delete context.fn;
        return result;
    }
}

function addAge (age) {
    console.log(`User Name is ${this.name}`);
    console.log(`This old age ${this.age}, add age is ${age}`)
    return this.age + age
}
let user = {
    name: 'ivan',
    age: 18
}

let bindAddAge = addAge.newBind(user, 11);
let newAge = bindAddAge();
console.log(`newAge ${newAge}`)
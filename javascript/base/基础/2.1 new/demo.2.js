
function Person(age, name) {
  this.age = age;
  this.name = name;
}
Person.prototype.sayHi = function () {
  console.log(`Hello, My Name is ${this.name}`)
}

function myNew() {
  const [cotr, ...parms] = arguments;
  const target = {};
  target.__proto__ = cotr.prototype
  const result = cotr.call(target, ...parms)
  if (typeof result === Object) {
    return result
  }
  return target
}

const p = myNew(Person, 18, 'ivan')
p.sayHi();
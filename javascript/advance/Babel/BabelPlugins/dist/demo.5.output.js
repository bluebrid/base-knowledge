function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

// const add = (a, b) => {
//     return a + b
// }
const add = function (a, b) {
  _newArrowCheck(this, this);

  return a + b;
}.bind(this); // var a = 1;
// var b = 2;
// var add = () => {
//     return this.a + this.b
// }


console.log(add());

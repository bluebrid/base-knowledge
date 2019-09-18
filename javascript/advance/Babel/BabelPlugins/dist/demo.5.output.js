function _newArrowCheck(x, boundThis) { if (x !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

// var add = (a, b) => a + b
// console.log(add())
// const add = (a, b) => {
//     return a + b
// }
// var a = 1;
// var b = 2;
var add = function () {
  _newArrowCheck(this, this);

  return this.a + this.b;
}.bind(this);

/**
 * Currying(柯里化) 是把一个接受 N 个参数的函数转换成接受一个单一参数（最初函数的第一个参数）的函数，
 * 并且返回接受余下的参数而且返回结果的新函数的技术。也就是说每个函数都接受1个参数。
 * 我们的 curry() 返回一个新的函数，允许我们用一个或多个参数来调用它，然后它将部分应用；
 * 直到它收到最后一个参数（基于原始函数的参数数量），此时它将返回使用所有参数调用原始函数的计算值。
 */

function curry(fn) {
  return function curried() {
    var args = [].slice.call(arguments);
    return args.length >= fn.length ?
      fn.apply(null, args) :
      function () {
        var rest = [].slice.call(arguments);
        return curried.apply(null, args.concat(rest));
      };
  };
}

function add(a, b, c) {
  return a + b + c;
}

var curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3));
// 6
console.log(curriedAdd(1)(2, 3));

/**
 * 下面这案例，输出不正确， this 指向不对
 */
var border = {
  style: 'border',
  generate: function (length, measure, type, color) {
    return [this.style + ':', length + measure, type, color].join(' ') + ';';
  }
};

border.curriedGenerate = curry(border.generate);

console.log(border.curriedGenerate(2)('px')('solid')('#369'));
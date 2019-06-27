/**
 * 在前面两个demo 中，我们已经实现了一个柯里化函数，而且解决了上下文的问题，
 * 但是我们的柯里化(curry)函数只会接收固定的参数，参会返回执行结果，否则返回的一个函数，我们有如下用例：
 * 一个max函数，可以接收任意个参数，返回其中最大的值：
 * max(1,23,4) => 23, max(22,33) -> 33,
 * 我们之前的curry 进行修改， 接收两个参数， 第一个参数就是我们要柯里化的函数， 第二个参数就是我们最小参数量
 */

function curry(fn, n) {
  var arity = n || fn.length;
  return function curried() {
    var args = [].slice.call(arguments);
    var context = this;// 保存上下文
    return args.length >= arity ?
      fn.apply(context, args) :
      function () {
        var rest = [].slice.call(arguments);
        return curried.apply(context, args.concat(rest));
      };
  };
}

function max() {
  var args = [].slice.call(arguments);
  return Math.max.apply(Math, args);
}

var curriedMax3 = curry(max, 3);
console.log(curriedMax3(1)(23, 4));

var curriedMax2 = curry(max, 2);
console.log(curriedMax2(22, 33));
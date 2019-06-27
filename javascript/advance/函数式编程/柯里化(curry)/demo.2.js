/**
 * 为了解决demo.1.js 中第二个案例this 问题，我们修改curry 函数如下
 */
function curry(fn) {
  return function curried() {
    var args = [].slice.call(arguments);
    var context = this;// 保存上下文
    return args.length >= fn.length ?
      fn.apply(context, args) :
      function () {
        var rest = [].slice.call(arguments);
        return curried.apply(context, args.concat(rest));
      };
  };
}

var border = {
  style: 'border',
  generate: function (length, measure, type, color) {
    return [this.style + ':', length + measure, type, color].join(' ') + ';';
  }
};

border.curriedGenerate = curry(border.generate);

console.log(border.curriedGenerate(2)('px')('solid')('#369'));
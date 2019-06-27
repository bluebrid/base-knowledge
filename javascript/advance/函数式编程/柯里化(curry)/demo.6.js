/**
 * 
 * @param {*} fn 
 */
function useWith(fn /*, txfn, ... */) {
  var transforms = [].slice.call(arguments, 1); // 获取所有的转换函数
  var _transform = function (args) {
    return args.map(function (arg, i) {
      return transforms[i](arg);
    });
  };
  return function () {
    var args = [].slice.call(arguments), // 获取对应的参数
      targs = args.slice(0, transforms.length),// 需要转换的参数数组， 根据
      remaining = args.slice(transforms.length); //剩余不需要转换的参数数组

    return fn.apply(this, _transform(targs).concat(remaining));
  };
}

function sum(a, b) { return a + b; }

function add1(v) { return v + 1; }

var additiveSum = useWith(sum, add1, add1);

// 在总和接收 4 ＆ 5 之前，
// 它们都首先通过 'add1()' 函数进行转换
console.log(additiveSum(4, 5));  // 11
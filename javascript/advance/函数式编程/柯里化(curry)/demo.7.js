function flip(fn) {
  return function () {
    var args = [].slice.call(arguments);
    return fn.apply(this, args.reverse());
  };
}

// 返回一个新函数，
// 从右到左柯里化原始函数的参数。
function rightCurry(fn, n) {
  var arity = n || fn.length,
    fn = flip(fn);
  return function curried() {
    var args = [].slice.call(arguments),
      context = this;

    return args.length >= arity ?
      fn.apply(context, args.slice(0, arity)) :
      function () {
        var rest = [].slice.call(arguments);
        return curried.apply(context, args.concat(rest));
      };
  };
}

function useWith(fn /*, txfn, ... */) {
  var transforms = [].slice.call(arguments, 1); // 获取所有的转换函数
  var _transform = function (args) {
    return args.map(function (arg, i) {
      return transforms[i](arg);
    });
  };
  return function () {
    var args = [].slice.call(arguments), // 获取对应的参数
      targs = args.slice(0, transforms.length), // 需要转换的参数数组， 根据
      remaining = args.slice(transforms.length); //剩余不需要转换的参数数组

    return fn.apply(this, _transform(targs).concat(remaining));
  };
}

function filter(list, fn) {
  return list.filter(fn);
}

function filterWith(fn) {
  return function (list) {
    return filter(list, fn);
  };
}

function greaterThanOrEqual(a, b) {
  return a >= b;
}

function get(obj, prop) { return obj[prop]; }

var greaterThanOrEqualTo = rightCurry(greaterThanOrEqual);

// `get()` 的柯里化版本
var getWith = rightCurry(get);

var thirtyDaysAgo = (new Date()).getTime() - (86400000 * 30);

var within30Days = useWith(greaterThanOrEqualTo(thirtyDaysAgo), getWith('published'));

var dates = [
  { id: 1, published: (new Date('2019-06-21')).getTime() },
  { id: 2, published: (new Date('2015-05-01')).getTime() }
];

// 获取数组中 published（发布日期）在30天内的任何对象
console.log(filterWith(within30Days)(dates));
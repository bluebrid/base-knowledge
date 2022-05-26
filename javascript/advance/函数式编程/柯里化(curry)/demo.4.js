/**
 * 
 * @param {*} fn 
 */
// 返回一个函数，
// 该函数在调用时将参数的顺序颠倒过来。
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

function filter(list, fn) {
  return list.filter(fn);
}
// filterwith 成为一个通用的方法
var filterWith = rightCurry(filter);

var list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 创建一个偏应用过滤器，获取列表中的偶数
var justEvens = filterWith(function (n) { return n % 2 == 0; });

justEvens(list);

// 这是一个断言函数, 也能重复使用
function greaterThanOrEqual(a, b) {
  return a >= b;
}

var greaterThanOrEqualTo = rightCurry(greaterThanOrEqual);

// a unary comparison function to see if a value is >= 5
var fiveOrMore = greaterThanOrEqualTo(5);

filterWith(fiveOrMore)(list);

var thirtyDaysAgo = (new Date()).getTime() - (86400000 * 30),
  within30Days = greaterThanOrEqualTo(thirtyDaysAgo);

var dates = [
  (new Date('2018-07-29')).getTime(),
  (new Date('2019-06-01')).getTime()
];

console.log(filterWith(within30Days)(dates));
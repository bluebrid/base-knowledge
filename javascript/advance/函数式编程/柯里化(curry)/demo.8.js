var toString = Object.prototype.toString;
var isFunction = function (o) { return toString.call(o) == '[object Function]'; };

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

function group(list, prop) {
  return list.reduce(function (grouped, item) {
    var key = isFunction(prop) ? prop.apply(this, [item]) : item[prop];
    grouped[key] = grouped[key] || [];
    grouped[key].push(item);
    return grouped;
  }, {});
}
// `group()` 的 `rightCurry` 版本
var groupBy = rightCurry(group);

var list = [
  { value: 'A', tag: 'letter' },
  { value: 1, tag: 'number' },
  { value: 'B', tag: 'letter' },
  { value: 2, tag: 'number' }
];

console.log(groupBy('tag')(list));

var list2 = [
  { name: 'Dave', age: 40 },
  { name: 'Dan', age: 35 },
  { name: 'Kurt', age: 44 },
  { name: 'Josh', age: 33 }
];

var getKey = function (item) { return item.age < 40 ? 'under40' : 'over40'; };
console.log(groupBy(getKey)(list2));
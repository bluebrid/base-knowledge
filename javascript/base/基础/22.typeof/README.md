
## 有用资源
https://www.cnblogs.com/liu-fei-fei/p/7715870.html
https://www.imooc.com/article/69870
https://blog.csdn.net/qq_38722097/article/details/80717240

typeof 只能判断如下其中类型：

> typeof操作符返回一个字符串，表示未经计算的操作数的类型。
 
|类型|结果|
| ------------- |:-------------:|
|Number| "number"|
|String| "string"|
|Boolean| "boolean"|
|Undefined| "undefined"|
|Object| "object|
|function函数对象|"function"|
|Symbol (Es6 对象)| "symbol"|

## Q&A
--------------------
Q：为什么typeof 不能判断null 类型？ 
A: 因为null 类型在JS的最开始的设计意图是一个Object, 所以 `typeof null === 'object'`

--------------------

Q: 既然typeof 不能判断null类型， 那怎么判断null 类型?
A: 有如下两种方式可以判断`null`类型：
   1. `null === null`
   2. `Object.prototype.toString.call(null) === '[object Null]'`

--------------------

Q: 既然我们不能通过`typeof` 来判断`null` ， 那我们可不可以用`instanceof` 来判断呢? 如： `obj instanceof null`
A: 显然也是不能的， 因为`instanceof` 是通过原型链来判断的，是通过判断左边操作符的**隐形原型**(`__proto__`) 是否在右边的**原型**(`prototype`) 上， 而`null.prototype` 是会报错的， 因为`null` 已经是最顶端的原型了， 他已经是一个空对象了。

--------------------

Q: `function` 不是一个基本数据类型，其实也是一个`Object` ,但是为什么`typeof` 却能判断`functions` 类型呢?
A: <<JavaScript 高级程序设计>>: 从技术角度讲，函数在ECMASCript 中确实是一个对象，不是一种数据类型， 但是函数也确实有一些**特殊** 的属性， 所以通过`typeof` 操作符来区分函数和其他对象是有必要的.

## 特殊案例

在`Number` 中有一个特殊的值`NaN`(Not a Number), 通过`typeof` 也是可以进行判断的，如：
```javascript
typeof 1/0; //NaN（这个NaN不是字符串类型，是数值类型）
typeof typeof 1/0; //NaN（这个NaN不是字符串类型，是数值类型）
typeof (1/0); //"number"
typeof typeof(1/0); //"string"
typeof (typeof 1/0); //"number"
```

## 经典案例

```javascript
// Numbers
typeof 37 === 'number';
typeof 3.14 === 'number';
typeof Math.LN2 === 'number';
typeof Infinity === 'number';
typeof NaN === 'number'; // 尽管NaN是"Not-A-Number"的缩写
typeof Number(1) === 'number'; // 但不要使用这种形式!

// Strings
typeof "" === 'string';
typeof "bla" === 'string';
typeof (typeof 1) === 'string'; // typeof总是返回一个字符串
typeof String("abc") === 'string'; // 但不要使用这种形式!

// Booleans
typeof true === 'boolean';
typeof false === 'boolean';
typeof Boolean(true) === 'boolean'; // 但不要使用这种形式!

// Symbols
typeof Symbol() === 'symbol';
typeof Symbol('foo') === 'symbol';
typeof Symbol.iterator === 'symbol';

// Undefined
typeof undefined === 'undefined';
typeof declaredButUndefinedVariable === 'undefined';
typeof undeclaredVariable === 'undefined'; 

// Objects
typeof {a:1} === 'object';

// 使用Array.isArray 或者 Object.prototype.toString.call
// 区分数组,普通对象
typeof [1, 2, 4] === 'object';

typeof new Date() === 'object';

// 下面的容易令人迷惑，不要使用！
typeof new Boolean(true) === 'object';
typeof new Number(1) ==== 'object';
typeof new String("abc") === 'object';

// 函数
typeof function(){} === 'function';
typeof Math.sin === 'function';

//NaN
typeof 1/0 === 'NaN';
```




## 参考文章
https://www.ibm.com/developerworks/cn/web/1306_jiangjj_jsinstanceof/index.html

https://www.imooc.com/article/69870

## typeof & instanceof

1. `typeof` 是用来判断基础数据类型的,如：Number, String Boolean, Symbol, Undefined, Function, Object这**七种**类型的
2. 但是其中`Function`其实不是一个基础类型，他也是一个`Object` 类型，但是`Function` 又有自己很多的特性，所以才设计可以通过`typeof` 来区分`Function`
3. 在上面七种类型中， 但是没有包括`null`, `null` 也是一个基础数据类型，但是`typeof` 不能判断`null`, 是因为`null` 又是一个特殊的`Object` 类型，所以`typeof null === 'object'`, 所以判断`null` 有如下两种方法：
> 1. `null === null`
> 2. `Object.prototype.toString.call(null) === '[object Null]'`
4. 除了`Function` ，任何的引用类型用`typeof` 运算符都是`object`,不能判断特定的引用类型.
5. `typeof` 的缺陷可以通过`instanceof` 来弥补， `instanceof` 可以明确却分不同的引用类型, 但是同样不能判断`null`类，如： `null instanceof null`会报错， 我们后面会针对`instanceof` 的原理来分析为什么.

## instanceof 常规用法
```javascript
function Foo() {

}

let foo =new Foo()
console.log(foo instanceof Foo) // true
```
上面会输出`true` ，表示`foo` 是`Foo` 的一个实例对象

我们也可以通过`instanceof` 来判断一个实例是否属于它的**父类型**, 如：
```javascript
// 判断 foo 是否是 Foo 类的实例 , 并且是否是其父类型的实例
function Aoo(){} 
function Foo(){} 
Foo.prototype = new Aoo();//JavaScript 原型继承
 
var foo = new Foo(); 
console.log(foo instanceof Foo)//true 
console.log(foo instanceof Aoo)//true
```

## 你真的了解instanceof 操作符吗?

我们可以看下如下的案例：

```javascript
console.log(Object instanceof Object)// true
console.log(Function instanceof Function)// true
console.log(Number instanceof Number)// false
console.log(String instanceof String)// false
console.log(Function instanceof Object)// true
console.log(Foo instanceof Function)// true
console.log(Foo instanceof Foo)// false
console.log(null instanceof Object)//false
console.log(undefined  instanceof Object)// false
```
看了上面的代码是不是又晕头转向了？为什么 Object 和 Function instanceof 自己等于 true，而其他类 instanceof 自己却又不等于 true 呢？如何解释？要想从根本上了解 instanceof 的奥秘，需要从两个方面着手：1，语言规范中是如何定义这个运算符的。2，JavaScript 原型继承机制。

## ECMASript instanceof 规范
https://www.ecma-international.org/ecma-262/5.1/#sec-11.8.6

如下是`instanceof`在ECMAScript 中的定义:
```
The production RelationalExpression : RelationalExpression in ShiftExpression is evaluated as follows:

Let lref be the result of evaluating RelationalExpression.
Let lval be GetValue(lref).
Let rref be the result of evaluating ShiftExpression.
Let rval be GetValue(rref).
If Type(rval) is not Object, throw a TypeError exception.
Return the result of calling the [[HasProperty]] internal method of rval with argument ToString(lval).
```

我们用代码实现如下：
```javascript
function instance_of(L, R) {
    if (R === null) {
        throw new TypeError("Right-hand side of 'instanceof' is not an object")
    }
    let lval = L;
    if (L != null) {
      lval = L.__proto__
    }  
    let rval = R.prototype 
    let baseTypes = ['string', 'number', 'boolean', 'symbol', 'null', 'undefined']
    if (baseTypes.includes(typeof rval)) {// // If Type(rval) is not Object, throw a TypeError exception.
      throw new TypeError("Right-hand side of 'instanceof' is not an object")
    }
    while(true) {
        if (lval === null || lval === undefined) {
            return false
        }
        if (lval === rval) {
            return true
        }
        lval = lval.__proto__;
    }
}
```
1. 从上面的代码，可知，为什么上面提到了`null instanceof null` 为什么会报错。是因为：**If Type(rval) is not Object, throw a TypeError exception.**
2. 如果`instanceof` 右边的操作符不是一个`Object` 是会需要抛出`TypeError` 错误的,如： `1 instanceof '1'`, 是因为右侧的变量`1`是一个基础类型`number`, 所以会报错
3. 从上面的代码，可知，`instanceof` 是根据`原型` 来判断类型的.**左边**的**隐式原型**(<font color=red>proto</font>)和**右边**的**显式原型**(<font color=red>prototype</font>)来进行比较。左边的原型会一直往上查找，直到左边的原型与右边的原型相等或者左边的原型为**null**.
4. <font color=red>所有的Javascript 都有__proto__属性， 但是只有Object.prototype.__proto__为null.</font>

我们针对上面的代码再次来分析如下案例：
```javascript
function Foo () {};
// 1
// console.log(Object instanceof Object)// true
console.log(instance_of(Object, Object))// true
// 2
// console.log(Function instanceof Function)// true
console.log(instance_of(Function, Function))// true
// 3
// console.log(Number instanceof Number)// false
console.log(instance_of(Number, Number))// false
// 4
// console.log(String instanceof String)// false
console.log(instance_of(String, String))// false
// 5
// console.log(Function instanceof Object)// true
console.log(instance_of(Function, Object))// true
// 6
// console.log(Foo instanceof Function)// true
console.log(instance_of(Foo, Function))// true
// 7
// console.log(Foo instanceof Foo)// false
console.log(instance_of(Foo, Foo))// false
// 8
// console.log(null instanceof Object)//false
console.log(instance_of(null, Object))//false
// 9
// console.log(undefined  instanceof Object)// false
console.log(instance_of(undefined, Object))// false
```
1. 我们先来分析`console.log(instance_of(Object, Object))// true`：

首先我们需要认知`Object` 其实是一个`Funtion`,如下图：
![](https://user-gold-cdn.xitu.io/2019/5/8/16a963507f5cd26f?w=361&h=79&f=png&s=6413)
所以: `Object.__proto === Function.prototype`
而`Function`其实就是一个`Object`, 所以： `Function.prototype.__proto__ === Object.prototype`

我们再根据`instance_of` 来进行推导：
```javascript
lval = Object.__proto__ = Function.prototype
rval = Object.prototype
// 第一次判断
lval != rval
// 循环查找lval.prototype
lval = Function.prototype = Function.prototype.__proto__ = Object.prototype
// 第二次判断
lval === rval
// 返回true
```

2. 接下来我们来分析`console.log(instance_of(Function, Function))// true`:
我们再根据`instance_of` 来进行推导：
```javascript
lval = Function.__proto__ = Function.prototype // __proto 就是指向对应的prototype
rval = Function.prototype = Function.prototype 
// 第一次判断
lval === rval
// 返回true
```
3. 接下来我们来分析`console.log(instance_of(Number, Number))// false`

首先`Number` 是一个基础数据类型，同时是一个`Function`,
![](https://user-gold-cdn.xitu.io/2019/5/8/16a965b730fded06?w=385&h=128&f=png&s=6520)
我们再根据`instance_of` 来进行推导：

```javascript
lval = Number.__proto__ 
// 因为Number 是一个Function , 所以Number.__proto__ === Function.prototype
lval = Number.__proto__ = Function.prototype

rval = Number.prototype
// 因为Number 是一个基本数据类型， 所以Number.prototype 指向的是Number 对象本身， 如下图所示
// 第一次判断
lval !== rval
// 循环查找lval.__proto__
lval = Function.prototype.__proto__ = Object.prototype
// 第二次判断
lval != rval
// 循环查找lval.__proto__
lval = Object.prototype.__proto__
// 在上面已经分析过： Object.prototype.__proto__为null.

// return false
```
![](https://user-gold-cdn.xitu.io/2019/5/8/16a9664f9b849a34?w=707&h=91&f=png&s=11633)

4. `console.log(instance_of(String, String))// false` 跟上面第三点分析一样

5. 接下来我们来分析`console.log(instance_of(Foo, Function))// true`
Foo 是我们定义的一个Function: `function Foo() {}`
所以其实Foo 就是Function 的一个实例，所以`Foo.__proto__ === Function.prototype`,
我们再根据`instance_of` 来进行推导：

```javascript
lval = Foo.__proto__ = Function.prototype
rval = Function.prototype 
// 第一次判断
lval === rval
// return true
```

6. 接下来我们来分析`console.log(instance_of(Foo, Foo))// false`

```javascript
lval = Foo.__proto__ = Function.prototype
rval = Foo.prototype
// 因为Foo 其实就是定义了一个Function，所以Foo.prototype如下图
// 第一次判断
lval != rval
// 循环查找lval.__proto__
lval = Foo.prototype.__proto__ = Object.prototype
// 第二次判断
lval !=rval
// 循环查找lval.__proto__
lval = Object.prototype.__proto__ = null
// return false
```
![](https://user-gold-cdn.xitu.io/2019/5/8/16a967f869e6b7e2?w=440&h=218&f=png&s=17453)

# Mobx  源码解析 
[中文文档](https://github.com/SangKa/MobX-Docs-CN/tree/4.0.0/docs)
## 前言
在Git 找到[Mobx](https://github.com/mobxjs/mobx) 的源码(<font size=5 color=red>版本: 5</font>)，
发现其是使用**TypeScript** 编写,因为我对Typescrit 没有项目经验，所以我先会将其编译成**JavaScript**，
所以我们可以运行如下脚本编译生成对应的`JavaScript`脚本：
1. ` git clone git@github.com:mobxjs/mobx.git`
2. `npm i`
3. `npm run small-build`

会在根目录下面生成两个文件夹`.build.es5` 和`.build.es6`的文件夹，其分别对应的是`TypeScript`编译后的`es5/6`的脚本.

我们通过`npm react-create-app mobx-learning` 来快速创建一个项目，然后将上面生成的`.build.es6` 文件夹，拷贝到`src`目录下面.


## Demo
首先我们从一个最基本的[Demo](https://github.com/bluebrid/mobx-learnging/tree/master)开始，来看**Mobx** 的基本使用方式:
我们修改`src/index.js`如下：

```javascript
import { observable, autorun } from './.build.es6/mobx'
const addBtn = document.getElementById('add')
const minusBtn = document.getElementById('minus')
const incomeLabel = document.getElementById('incomeLabel')
const nameInput = document.getElementById('name');
const bankUser = observable({
    name: 'Ivan Fan',
    income: 3,
    debit: 2
});

const incomeDisposer = autorun((reaction) => {
    incomeLabel.innerText = `${bankUser.name} income is ${bankUser.income}`
})
// incomeDisposer();
autorun(() => {
    console.log('账户存款:', bankUser.income);
});
autorun(() => {
    console.log('账户名称:', bankUser.name);
});
var nameDisposer = autorun(() => {
    console.log("name:" + bankUser.name)
});
addBtn.addEventListener('click', () => {
    bankUser.income++
})
minusBtn.addEventListener('click', () => {
    bankUser.income--
})
nameInput.addEventListener('change', (e) => {
    bankUser.name= e.target.value;
})

```
我们的界面非常简单，如图: 
![](https://user-gold-cdn.xitu.io/2018/9/11/165c6c841c993e7a?w=278&h=51&f=png&s=2308)
<center><font size=5>图1</font></center>

两个Button , 一个label. 我们在js 文件中，我们给两个按钮添加了 **click**  事件，
事件的主体非常简单`bankUser.income ++` `bankUser.income --`,
 就是对`bankuser` 的`income` 属性进行了自增或者自减，
 非常神奇， 当我们点击对应的按钮的时候， 中间的label 的内容发生了变化。但是我们在Button 的点击事件中并没有去操作**incomeLabel** 的内容，
 但是其内容确实随着点击事件，实时发生了变化。究其原因，只有以下代码对**incomeLabel** 的text 进行了处理：

```javascript
const incomeDisposer = autorun(() => {
    incomeLabel.innerText = `Ivan Fan income is ${bankUser.income}`
})
```

这就是**Mobx** 的最简单神秘的功能，我们可以先从此开始深入研究它。

## 文件结构
我们打开`.build.e6`文件夹结构如下：

![](https://user-gold-cdn.xitu.io/2019/6/14/16b53ec6f0b0f3bd?w=215&h=172&f=png&s=5368)

我们从上面的Demo 中引用`mobx`的方式`import { observable, autorun } from './.build.es6/mobx'`可知，
`mobx.js` 就是入口文件， 一开我们就已经说明了我们分析的版本是： <font size=5 color=red>5</font>,
`mobx.js` 有对这几个文件做了简单的说明：

 * Source folders:
 * ===============
 *
 * - api/     Most of the public static methods exposed by the module can be found here.
 * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
 * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
 * - utils/   Utility stuff.

我们从`mobx.js`的代码中可以看到,必须需要环境支持`Proxy`
```javascript
if (typeof Proxy === "undefined" || typeof Symbol === "undefined") {
    throw new Error("[mobx] MobX 5+ requires Proxy and Symbol objects. If your environment doesn't support Proxy objects, please downgrade to MobX 4. For React Native Android, consider upgrading JSCore.");
}
```
然后`mobx.js`就是从`internal.js` 中`import` 大量的对象.

## observable（src/.build.es6/api/observable.js）

从上面的`index.js`文件中，我们发现其中引用了**mobx** 两个方法，
分别是[observable](https://cn.mobx.js.org/refguide/observable.html) 和 [autorun](https://cn.mobx.js.org/refguide/autorun.html),
是的，是这样两个方法，让**incomeLabel** 在点击按钮的时候实时的发生了变化，
所以我们接下来会对这两个方法进行深入分析，这一章节我们会先分析<font color=red>observable</font> 先进行分析。
 

observable，翻译成中文就是**可以观测的**, 我们现在来调试这个方法，
我们可以``const bankUser = observable({`` 这一行打一个断点，然后`F11`,跳进去，

`observable` 对应的是一个`src/.build.es6/api/observable.js`<font color=red>createObservable</font> 方法，也就是创建一个可以观察的对象：
```javascript
function createObservable(v, arg2, arg3) {
    // @observable someProp;
    if (typeof arguments[1] === "string") {
        return deepDecorator.apply(null, arguments);
    }
    // it is an observable already, done
    if (isObservable(v))
        return v;
    // something that can be converted and mutated?
    const res = isPlainObject(v)
        ? observable.object(v, arg2, arg3)
        : Array.isArray(v)
            ? observable.array(v, arg2)
            : isES6Map(v)
                ? observable.map(v, arg2)
                : v;
    // this value could be converted to a new observable data structure, return it
    if (res !== v)
        return res;
    // otherwise, just box it
    fail(process.env.NODE_ENV !== "production" &&
        `The provided value could not be converted into an observable. If you want just create an observable reference to the object use 'observable.box(value)'`);
}
```

上面代码很简单，参数有三个，但是我们在调用的时候，值传递了一个参数， 所以我们暂且只要关心第一个参数<font color=red size=5> r </font>.以下是这个functin 的基本逻辑：
1. 如果传入的第二个参数是一个字符串， 则直接调用`deepDecorator.apply(null, arguments);`
2. 判断第一个参数是否已经是一个可观察的对象了，如果已经是可观察的对象了，就直接返回这个对象
3. 判断第一个参数是什么类型，然后调用不同的方法， 总共有三种类型: <font color=red size=5> object </font>,<font color=red size=5> array </font>,<font color=red size=5> map </font>(ES 的Map 数据类型)， 分别调用：`observable.object`, `observable.array`, `observable.map`方法， 
而`export const observable = createObservable;`表面就是createObservable方法。
但是这个方法就短短几行代码，并没有object, array, map着三个方法， 我们发现在这个方法下面有**observableFactories** 对象,其是一个工厂对象，用来给createObservable添加方法，其定义了这三个方法，并且通遍历过`Object.keys(observableFactories).forEach(function (name) { return (observable[name] = observableFactories[name]); });`

因为在我们的Demo 中我们传递的是一个Object, 所以会调用`observable.object` 方法，接下来我们在继续分析这个方法, 其代码如下:
```javascript
    object(props, decorators, options) {
        if (typeof arguments[1] === "string")
            incorrectlyUsedAsDecorator("object");
        const o = asCreateObservableOptions(options);
        if (o.proxy === false) {
            return extendObservable({}, props, decorators, o);
        }
        else {
            const defaultDecorator = getDefaultDecoratorFromObjectOptions(o);
            // base 添加了Atom 类型属性
            /**
             * 1.base对象，就是添加了一个Symbol("mobx administration"); 的属性， 类型是一个：ObservableObjectAdministration 对象
             * 2.
             */
            const base = extendObservable({}, undefined, undefined, o);
            const proxy = createDynamicObservableObject(base);
            extendObservableObjectWithProperties(proxy, props, decorators, defaultDecorator);
            return proxy;
        }
    }
```
`var o = asCreateObservableOptions(options);` 生成的了一个简单的对象：

```javascript
var defaultCreateObservableOptions = {
    deep: true,
    name: undefined,
    defaultDecorator: undefined,
    proxy: true
};
```
`o.proxy` 的值为`true`, 所以会走`else` 逻辑分支， 所以接下来我们一一分析`else` 分支中的每一条代码。
1. `var defaultDecorator = getDefaultDecoratorFromObjectOptions(o);` 这个是跟装饰器有关的逻辑，我们先跳过

2. `var base = extendObservable({}, undefined, undefined, o);` 对<font color=red>o</font>对象进行了加工处理，变成了一个`Symbol` 数据类型。
> 这一步操作非常重要，给一个空对象添加了一个`$mobx$$1`(`var $mobx$$1 = Symbol("mobx administration");`)的属性， 其值是一个 `ObservableObjectAdministration` 类型对象，
其`write` 方法在后续数据拦截中会调用。 


![](https://user-gold-cdn.xitu.io/2018/9/12/165cca456223bc74?w=782&h=779&f=png&s=105961)
<center><font size=5>图3</font></center>

3.  `var proxy = createDynamicObservableObject(base);` 这个方法，最为**核心**, 对这个对象进行了代理(<font color=red>Proxy</font>)

![](https://user-gold-cdn.xitu.io/2018/9/11/165c7b0533b17391?w=586&h=382&f=png&s=63823)
<center><font size=5>图4</font></center>


对这个对象的属性的`get`, `set`, `has`, `deleteProperty`, `ownKeys`, `preventExtensions`方法进行了代理拦截，这个是**Mobx** 事件数据添加的一个核心点。

4. 第三点的`proxy` 其实只是初始化了一个简单的代理对象，但是没有与我们需要观察的`target`(也就是`mobx.observable`方法传递进来的需要被观察的对象)关联起来， ` extendObservableObjectWithProperties(proxy, props, decorators, defaultDecorator);` 方法会遍历`target` 的属性，将其赋值给`proxy`对象， 然后我们`mobx.observable` 里的对象都被代理了，也就是实现了对属性操作的拦截处理。

5. 在第四点`extendObservableObjectWithProperties` 方法中， 最终会给原始的对象的属性进行**装饰**，通过查看function 的 call stack 得知，最后对调用<font size=5 color=red>ObservableObjectAdministration</font> 的addObservableProp 方法， 针对每一个**propName**(原始对象的Key)生成一个<font size=5 color=red>ObservableValue</font> 对象，并且保存在<font size=5 color=red>ObservableObjectAdministration</font> 对象的**values**中

![](https://user-gold-cdn.xitu.io/2018/9/17/165e697a75a1bd06?w=1620&h=888&f=png&s=273177)

从**图三**中发现， 真正实现数据拦截的就是`objectProxyTraps` 拦截器， 下一章节，我们需要对这个拦截器进行深入分析，着重看`get`,`set `如何实现了数据拦截。

5. `return proxy; ` 最终将返回一个已经被代理过的对象，替换原生对象。
> bankUser 对象就是一个已经被代理了的对象，并且包含了一个`Symbol` 类型的新的属性。
```
const bankUser = mobx.observable({
    name: 'Ivan Fan',
    income: 3,
    debit: 2
});
```
## 总结
1. observable 首先传入一个原始对象(可以传入多种类型的数据: `array`, `map`, `object`， 现在只分析object 类型的情况)
2. 创建一个空的Object 对象，并且添加一些默认属性(`var base = extendObservable$$1({}, undefined, undefined, o);`), 包括一个`Symbol`类型的属性，其值是一个`ObservableObjectAdministration` 类型的对象.
3. 将这个对象用**ES6** 的<font color=red>Proxy</font> 进行了代理， 会拦截这个对象的一些列操作(`get`, `set`...) `var proxy = new Proxy(base, objectProxyTraps);`
4. 将原始对象，进行遍历，将其所有的自己的属性挂载在新创建的空对象中
5. 返回已经加工处理的对象`bankUser`
6. 后续就可以监听这个对象的相应的操作了。
7. 加工后的对象如下图所示, 后面操作的对象，就是如下这个对象，但是**observable** 方法，其实只是做到了如下图的第二步(2), 第三步(3)的<font size=5 color=red>observers</font>属性还是一个没有任何值的Set 对象，在后续分析**autorun** 方法中，会涉及到在什么时候去给它赋值


![](https://user-gold-cdn.xitu.io/2018/9/17/165e683e3df0fa52?w=1609&h=918&f=png&s=185663)



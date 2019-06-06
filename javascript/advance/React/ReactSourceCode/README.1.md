## FiberNode

在执行`ReactDOM.render` -> `legacyRenderSubtreeIntoContainer` -> `legacyCreateRootFromDOMContainer` -> `ReactRoot`

```javascript
function ReactRoot(container, isConcurrent, hydrate) {
  var root = createContainer(container, isConcurrent, hydrate);
  log(`(ReactRoot)在ReactRoot构造函数中创建一个_internalRoot 的属性`)
  this._internalRoot = root;
}
```
创建了一个`ReactRoot` 的对象，其中有一个`_internalRoot`的属性，指向了`root`:
![](https://user-gold-cdn.xitu.io/2019/5/31/16b0c0e53124eb60?w=771&h=447&f=png&s=52024)

其有两个重要的属性：`containerInfo` 和 `current` ,
1. `containerInfo` 表示Dom的容器
2. `current` 是一个`FiberNode` 对象，其对应的`tag` **3** 表示是一个根节点(`var HostRoot = 3` )

在`legacyRenderSubtreeIntoContainer` 方法中调用`root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate)`
生成了一个`root` 对象, 并且将`root` 挂载在`container._reactRootContainer` 上。

`root` 是一个`ReactRoot` 对象。

## ReactRoot

`ReactRoot` 就只有一个内置属性`_internalRoot`,

但是其原型上有四个方法：
![](https://user-gold-cdn.xitu.io/2019/5/31/16b0c14e8e995ffe?w=920&h=195&f=png&s=27228)
其比较重要的有：`render`, `createBatch`, `unmount`

`legacyRenderSubtreeIntoContainer` 下面就会执行`render` 方法：
```javascript
  unbatchedUpdates(function () {
      if (parentComponent != null) {
        root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
      } else {
        root.render(children, callback);
      }
    });
```
上面的代码会执行`else` 分支`root.render(children, callback);`
上面的`children` 就是我们执行`ReactDOM.render`传入的第一个参数`React.createElement(App, null)`, 
`callback` 其实对应的是`ReactDOM.render`第三个参数,也就是回调函数，但是进行了加工:

```javascript
  var originalCallback = callback;
      callback = function () {
        var instance = getPublicRootInstance(root._internalRoot);
        originalCallback.call(instance);
      };
```
所以我们下面来看下`render`方法

### render

```javascript
ReactRoot.prototype.render = function (children, callback) {
  log(`(ReactRoot)调用ReactRoot 的render 方法`)
  var root = this._internalRoot;
  var work = new ReactWork();
  log(`(ReactRoot)在ReactRoot 中创建了一个ReactWork的对象`)  
  if (callback !== null) {
    log(`(ReactRoot)执行ReactWork的then 方法， 就是将callback保存在ReactWork的私有变量_callbacks中`)
    work.then(callback);
  }
  log(`(ReactRoot)执行updateContainer方法`)
  updateContainer(children, root, null, work._onCommit);
  return work;
};
```
render 是`ReactRoot`的是一个原型方法， 而上面的`root`就是一个`ReactRoot`的实例化对象.
在这个方法中，首先创建了一个`ReactWork` 对象`work`，并且执行了`work.then(callback)`方法，

### ReactWork

```javascript
function ReactWork() {
  this._callbacks = null;
  this._didCommit = false;
  // TODO: Avoid need to bind by replacing callbacks in the update queue with
  // list of Work objects.
  this._onCommit = this._onCommit.bind(this);
}
ReactWork.prototype.then = function (onCommit) {
  if (this._didCommit) {
    onCommit();
    return;
  }
  var callbacks = this._callbacks;
  if (callbacks === null) {
    callbacks = this._callbacks = [];
  }
  callbacks.push(onCommit);
};
```
`then` 方法，就是将`callback` 方法保存在实例属性`callbacks` 数组中。







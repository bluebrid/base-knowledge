## [使用 Node.js 的 Async Hooks 模块追踪异步资源](https://www.nodejs.red/#/nodejs/modules/async-hooks)
> 1. 用来追踪Nodejs 程序中异步资源的声明周期， 可以在多个异步调用之间共享数据
> 2. 提供了一个executionAsyncId标记当前执行上下文的异步资源的ID
> 3. triggerAsyncId 函数来标记当前执行上下文被触发的异步资源ID, 也就是当前异步资源是由哪个异步资源创建的
> 4. 每个异步资源都会生成 asyncId，该 id 会呈递增的方式生成，且在 Node.js 当前实例里全局唯一。
```javascript
// demo.1.js

const asyncHooks = require('async_hooks');
const fs = require('fs');
const asyncId = () => asyncHooks.executionAsyncId();
const triggerAsyncId = () => asyncHooks.triggerAsyncId();

console.log(`Global asyncId: ${asyncHooks.executionAsyncId()}, Global triggerAsyncId: ${triggerAsyncId()}`);

fs.open('hello.txt', (err, res) => {
  console.log(`fs.open asyncId: ${asyncId()}, fs.open triggerAsyncId: ${triggerAsyncId()}`);
});
```
## Promise 默认未开启执行跟踪
```javascript
Promise.resolve().then(() => {
  // Promise asyncId: 0. Promise triggerAsyncId: 0
  console.log(`Promise asyncId: ${asyncId()}. Promise triggerAsyncId: ${triggerAsyncId()}`);
})
```

## 生命周期
> 1. init
> 2. before
> 3. after
> 4. destory
```javascript
import async_hooks from 'async_hooks';

// 返回当前执行上下文的 ID。
const eid = async_hooks.executionAsyncId();

// 返回负责触发当前
// 执行范围回调的句柄ID。
const tid = async_hooks.triggerAsyncId();

// 创建新的 AsyncHook 实例。所有这些回调都是可选的。
const asyncHook =
    async_hooks.createHook({ init, before, after, destroy, promiseResolve });

// 允许调用此 AsyncHook 实例的回调。
// 这不是运行构造函数后的隐式操作，
// 必须显式运行才能开始执行回调。
asyncHook.enable();

// 禁用监听新的异步事件。
asyncHook.disable();

//
// 以下是可以传给 createHook() 的回调。
//

// init 在对象构造过程中被调用。
// 当此回调运行时，资源可能尚未完成构造，
// 因此 "asyncId" 引用的资源的所有字段可能尚未填充。
function init(asyncId, type, triggerAsyncId, resource) { }

// Before 在调用资源的回调之前调用。
// 对于句柄（例如 TCPWrap）可以调用 0-N 次，
// 而对于请求（例如 FSReqCallback）将恰好调用 1 次。
function before(asyncId) { }

// After 在资源的回调完成后被调用。
function after(asyncId) { }

// 资源销毁时调用销毁。
function destroy(asyncId) { }

// promiseResolve 仅在调用传给 `Promise` 构造函数的 `resolve` 函数时
// （直接或通过其他解决 promise）
// 时调用 promise 资源。
function promiseResolve(asyncId) { }
```


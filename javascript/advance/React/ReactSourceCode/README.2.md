## 首次渲染DOM
1. 执行`renderRoot` 
2. 执行`workLoop`
```javascript
// isYieldy 为false
function workLoop(isYieldy) {
  if (!isYieldy) {
    // Flush work without yielding
    while (nextUnitOfWork !== null) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
  } else {
    // Flush asynchronous work until there's a higher priority event
    while (nextUnitOfWork !== null && !shouldYieldToRenderer()) {
      nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    }
  }
}
```
3. 执行`performUnitOfWork`
4. 执行`beginWork` `next = beginWork(current$$1, workInProgress, nextRenderExpirationTime);`
5. 执行`mountIndeterminateComponent` `mountIndeterminateComponent(current$$1, workInProgress, elementType, renderExpirationTime)`
6. 执行`renderWithHooks` `value = renderWithHooks(null, workInProgress, Component, props, context, renderExpirationTime);`
在`renderWithHooks` 方法中会运行`var children = Component(props, refOrContext);` 也就是执行创建组件的方法：
```javascript
const App = props => {
  return React.createElement("h1", { className: "title" }, "1");
}
```
返回的对象是：
```json
$$typeof: Symbol(react.element)
key: null
props: {className: "title", children: "1"}
ref: null
type: "h1"
_owner: FiberNode {tag: 2, key: null, stateNode: null, elementType: ƒ, type: ƒ, …}
_store: {validated: false}
_self: null
_source: null
__proto__: Object
```






4. 执行`completeUnitOfWork` 传递`workInProgress` 一个`FiberNode` 对象
5. 执行`completeWork` `completeWork(current$$1, workInProgress, nextRenderExpirationTime);`
`current$$1= workInProgress.alternate`
6. 执行` nextUnitOfWork = completeWork(current$$1, workInProgress, nextRenderExpirationTime);`
7. 执行`createInstance` ` var instance = createInstance(type, newProps, rootContainerInstance, currentHostContext, workInProgress);` 创建一个真实的Dom
8. 执行`var domElement = createElement(type, props, rootContainerInstance, parentNamespace);`
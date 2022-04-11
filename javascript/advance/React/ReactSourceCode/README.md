[react源码解析](https://xiaochen1024.com/courseware/60b1b2f6cf10a4003b634718/60b1b328cf10a4003b63471b)
## ReactDOM.render 方法

1. `ReactDOM.render` 是定义在`react-dom.development.js` 中的`ReactDOM` 的一个方法.
```javascript
  render: function (element, container, callback) {
    log('(render)调用render 方法，forceHydrate参数设置为false, 如果为true时， 表示是服务端渲染 ')
    return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
  },
```
`render` 直接调用`legacyRenderSubtreeIntoContainer` 方法.
2. `legacyRenderSubtreeIntoContainer` 
```javascript
function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
  
  var root = container._reactRootContainer;
  if (!root) {
    // Initial mount
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);
    log('(legacyRenderSubtreeIntoContainer)默认是没有root对象的，初始化一个root(ReactRoot)对象，其内部有一个_internalRoot对象，也就是我们需要重点介绍的fiber对象')
    if (typeof callback === 'function') {
      var originalCallback = callback;
      callback = function () {
        var instance = getPublicRootInstance(root._internalRoot);
        originalCallback.call(instance);
      };
    }
    // Initial mount should not be batched.
    log('(unbatchedUpdates)开始调用unbatchedUpdates方法， 我们假设parentComponent为null , 则直接调用root.render方法')
    unbatchedUpdates(function () {
      if (parentComponent != null) {
        root.legacy_renderSubtreeIntoContainer(parentComponent, children, callback);
      } else {
        root.render(children, callback);
      }
    });
  } else {
   ...
  }
  return getPublicRootInstance(root._internalRoot);
}
```
上面的代码， 有针对`callback` 进行了加工了。获取了一个`instance`, 我们其实可以在这个地方加个断点，进行调试 
3. `unbatchedUpdates` 

```javascript
function unbatchedUpdates(fn, a) {
  if (isBatchingUpdates && !isUnbatchingUpdates) {
    isUnbatchingUpdates = true;
    try {
      return fn(a);
    } finally {
      isUnbatchingUpdates = false;
    }
  }
  return fn(a);
}
```
`unbatchedUpdates` 就是判断是否是批量更新的一个处理， 在`ReactDOM.render` 第一次render的时候，其实就是直接执行`fn(a)`，
`fn`也就是我们执行`unbatchedUpdates` 的参数

4. `ReactRoot.prototype.render`

我们第二步，我们初始化了`root = container._reactRootContainer = legacyCreateRootFromDOMContainer(container, forceHydrate);` 其实就是一个`ReactRoot`的对象.

然后直接执行了`root.render` 方法也就是`ReactRoot.prototype.render`方法.

```javascript
ReactRoot.prototype.render = function (children, callback) {
  
  var root = this._internalRoot;
  var work = new ReactWork();   
  if (callback !== null) {
    log(`(ReactRoot)执行ReactWork的then 方法， 就是将callback保存在ReactWork的私有变量_callbacks中`)
    work.then(callback);
  }
  log(`(ReactRoot)执行updateContainer方法`)
  updateContainer(children, root, null, work._onCommit);
  return work;
};
```
这个方法，首先返回了一个`ReactWork` 的对象， 这个对象调用`then` 方法，将`callback` 保存在这个对象的实例属性`_callbacks`中
```javascript
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
`ReactWork`有个实例方法`_onCommit`方法，就是去遍历执行`_callbacks` 的.
`render` 接下来执行`updateContainer`方法


5. `scheduleRootUpdate`
`updateContainer` -> `updateContainerAtExpirationTime` -> `scheduleRootUpdate`
```javascript
function updateContainer(element, container, parentComponent, callback) {
  var current$$1 = container.current;
  var currentTime = requestCurrentTime();
  var expirationTime = computeExpirationForFiber(currentTime, current$$1);
  return updateContainerAtExpirationTime(element, container, parentComponent, expirationTime, callback);
}
```
在`updateContainer` 方法中计算了两个时间：`currentTime`(当前时间), `expirationTime`(过期时间)

```javascript

function scheduleRootUpdate(current$$1, element, expirationTime, callback) {
 
  log(`(scheduleRootUpdate), 首先我们会创建一个update, 这个对象和setState息息相关`)
  var update = createUpdate(expirationTime);
  /*
    return {
    expirationTime: expirationTime,

    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
    nextEffect: null
  };
  对于 update 对象内部的属性来说，我们需要重点关注的是 next 属性。
  因为 update 其实就是一个队列中的节点，这个属性可以用于帮助我们寻找下一个 update。
  对于批量更新来说，我们可能会创建多个 update，因此我们需要将这些 update 串联并存储起来，在必要的时候拿出来用于更新 state。 
  */
  // Caution: React DevTools currently depends on this property
  // being called "element".
  log(`(scheduleRootUpdate)在 render 的过程中其实也是一次更新的操作，但是我们并没有 setState，因此就把 payload 赋值为 {element} 了。`)
  update.payload = { element: element };

  callback = callback === undefined ? null : callback;
  if (callback !== null) {
    !(typeof callback === 'function') ? warningWithoutStack$1(false, 'render(...): Expected the last optional `callback` argument to be a ' + 'function. Instead received: %s.', callback) : void 0;
    update.callback = callback;
    log(`(scheduleRootUpdate)接下来我们将 callback 赋值给 update 的属性，这里的 callback 还是 ReactDom.render 的第三个参数。`)
  }

  flushPassiveEffects();
  log(`(scheduleRootUpdate)将刚才创建出来的 update 对象插入队列中， current$$1也就是当前的FiberNode节点(fiber)`)
  enqueueUpdate(current$$1, update);
  log(`(scheduleRootUpdate)调用scheduleWork, 也就是调度相关的内容`)
  scheduleWork(current$$1, expirationTime);

  return expirationTime;
}
```
`scheduleRootUpdate` 根据方法名来理解就是安排Root的更新，

首先会根据`expirationTime` 创建一个`update` 的对象：
```json
 {
    expirationTime: expirationTime,

    tag: UpdateState,
    payload: null,
    callback: null,

    next: null,
    nextEffect: null
  }
```
然后赋值`payload` 为: `{ element: element }`
赋值`callback`, 这个`callback`其实对应的就是`ReactWork.prototype._onCommit`方法，最终指向的是`ReactDOM.render`的回调函数

`enqueueUpdate` 方法就是将`update` 挂载在`current$$1`(就是root元素的`FiberNode`)`updateQueue` 的`lastUpdate` 和`firstUpdate` 属性上.


6. `scheduleWork`

在上面的代码我们已经生成了一个root `fiber`的对象了，我们后续就是基于这个对象来做操作的。

```javascript
function scheduleWork(fiber, expirationTime) {
  log(`(scheduleWork)任务调度开始`,'yellow')
  var root = scheduleWorkToRoot(fiber, expirationTime);
  markPendingPriorityLevel(root, expirationTime);
  if (
  !isWorking || isCommitting$1 ||
  nextRoot !== root) {
    var rootExpirationTime = root.expirationTime;
    log(`(scheduleWork)调用requestWork`)
    requestWork(root, rootExpirationTime);
  }
}
```
这个方法就是根据`fiber`和`expirationTime`生成了一个root对象， 然后调用`requestWork` 方法。

`root` 是根据`fiber.stateNode`生成的.

![](https://user-gold-cdn.xitu.io/2019/5/29/16b018629fe4c9a4?w=1087&h=409&f=png&s=57556)


7. `requestWork`

```javascript
function requestWork(root, expirationTime) {
  addRootToSchedule(root, expirationTime);
  log(`(requestWork)有三个分支，有两个重要的方法： performWorkOnRoot 和 performSyncWork， 就是我们默认的update函数,
  但是在我们的合成事件中， 走的是第二个分支if, 而第二个分支的isBatchingUpdates和isUnbatchingUpdates的初始值都是false,
  但是在interactiveUpdates$1 中会把 isBatchingUpdates 设为 true`)
  if (isRendering) {
    // Prevent reentrancy. Remaining work will be scheduled at the end of
    // the currently rendering batch.
    return;
  }

  if (isBatchingUpdates) {
    // Flush work at the end of the batch.
    if (isUnbatchingUpdates) {
      // ...unless we're inside unbatchedUpdates, in which case we should
      // flush it now.
      nextFlushedRoot = root;
      nextFlushedExpirationTime = Sync;
      performWorkOnRoot(root, Sync, false);
    }
    log('============================================> 合成事件, 会直接return, 所以不能直接在调用setState后获取最新的state', '#	#32CD32')
    return;
  }

  // TODO: Get rid of Sync and use current time?
  if (expirationTime === Sync) {
    log('============================================> 原生事件', '#32CD32')
    log(`(requestWork)performSyncWork, 原生事件在requestWork里走的是expirationTime === Sync分支，
    并没有被return, 所以会直接更新， 因此你可以在原生事件中console.log中直接拿到更新后的值`)
    performSyncWork();
  } else {
    
    scheduleCallbackWithExpirationTime(root, expirationTime);
  }
}
```
在`requestWork` 代码中， 有三个逻辑分支,分别代表不同的场景：
1. 分支1,表示如果已经在rendering 了，则直接return
2. 分支2,表示如果是批量更新，则也直接return(在合成事件中，调用this.setState会跑这个分支)
3. 分支3,表示同步更新， 我们在执行`ReactDOM.render`方法跑的是这个分支(再原生事件中，调用this.setState也会跑着分支)

所以我们先分析分支3就可以，这个分支:
首先会将`root` 保存在全局变量`nextFlushedRoot`, `Sync`保存在全局变量`nextFlushedExpirationTime`上， 然后会直接运行`performSyncWork` 方法

8. `performWorkOnRoot`
`performSyncWork` -> `performWork` -> `performWorkOnRoot`
```javascript
function performWorkOnRoot(root, expirationTime, isYieldy) {   
  isRendering = true;

  // Check if this is async work or sync/expired work.
  if (!isYieldy) {   
    var finishedWork = root.finishedWork;
    log(`(performWorkOnRoot)从root中， 获取finishedWork `)
    if (finishedWork !== null) {
      // This root is already complete. We can commit it.
      completeRoot(root, finishedWork, expirationTime);
    } else {
      log( log(`(performWorkOnRoot)从root中， 获取finishedWork `))
      root.finishedWork = null;
      // If this root previously suspended, clear its existing timeout, since
      // we're about to try rendering again.
      var timeoutHandle = root.timeoutHandle;
      if (timeoutHandle !== noTimeout) {
        root.timeoutHandle = noTimeout;
        // $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above
        cancelTimeout(timeoutHandle);
      }
      log(`(performWorkOnRoot)调用renderRoot, renderRoot 会去调用setInitialDOMProperties方法，设置Dom 的属性以及注册事件`)
      log(`(performWorkOnRoot), 因为finishedWork为null, 通过renderRoot 方法会给finishedWork 赋值`)
      renderRoot(root, isYieldy);
      finishedWork = root.finishedWork;
      log(`(performWorkOnRoot)finishedWork.lastEffect.updateQueue 就是要更新的队列`)
      if (finishedWork !== null) {
        // We've completed the root. Commit it.
        log(`(performWorkOnRoot)调用completeRoot`)
        completeRoot(root, finishedWork, expirationTime);
      }
    }
  } else {
    // Flush async work.
   .....
  }

  isRendering = false;
}
```

>1. 在这个方法中，首先设置全局变量`isRendering` 为`true` 表示已经开始准备`rendering`了，在`requestWork` 中针对这个进行了判断

>2. performWork 在调用这个方法的时候，第三个参数`isYieldy` 指定为`false`, 所以走的是第一个分支，也就是处理的是同步的任务

>3. 我们在`requestWork` 方法中，将`root` 保存在全局变量`nextFlushedRoot`中，而`performWorkOnRoot` 中的参数`root` 就是取的全局变量`nextFlushedRoot`

>4. 首先会从`root` 中去获取`finishedWork`, 并判断是否为空，开始是为空的，所以会走`else` 分支

>5. 执行`renderRoot(root, isYieldy);` 会去给`root.finishedWork` 赋值(<font size=5 color=red>需要深入分析renderRoot</font>), `finishedWork` 是个`FiberNode`

9. `commitRoot`

`completeRoot` -> `commitRoot`
```javascript
function commitRoot(root, finishedWork) {
  isWorking = true;
  isCommitting$1 = true;
  startCommitTimer();
  var firstEffect = void 0;
  if (finishedWork.effectTag > PerformedWork) {
    // A fiber's effect list consists only of its children, not itself. So if
    // the root has an effect, we need to add it to the end of the list. The
    // resulting list is the set that would belong to the root's parent, if
    // it had one; that is, all the effects in the tree including the root.
    if (finishedWork.lastEffect !== null) {
      log(`(commitRoot) 在执行ReactDOM.render 会进入这个分支，(finishedWork, lastEffect, nextEffect都是一个FiberNode 对象 )
      1. 将 finishedWork.lastEffect.nextEffect循环引用finishedWork,
      2. 将 finishedWork.firstEffect赋值给firstEffect变量
      `)
      finishedWork.lastEffect.nextEffect = finishedWork;
      firstEffect = finishedWork.firstEffect;
    } else {
      firstEffect = finishedWork;
    }
  } else {
    // There is no effect on the root.
    log(`(commitRoot) 从finishedWork 获取firstEffect, firstEffect.memoizedProps 是一个: {onClick: ƒ, children: "Click Me(4)"}`)
    firstEffect = finishedWork.firstEffect;
  }

  prepareForCommit(root.containerInfo);

  // Invoke instances of getSnapshotBeforeUpdate before mutation.
  log(`(commitRoot), 将firstEffect 赋值给nextEffect`)
  nextEffect = firstEffect;
  startCommitSnapshotEffectsTimer();
  while (nextEffect !== null) {
    var didError = false;
    var error = void 0;
    {
      
      invokeGuardedCallback(null, commitBeforeMutationLifecycles, null);
  }
  stopCommitSnapshotEffectsTimer();

  if (enableProfilerTimer) {
    // Mark the current commit time to be shared by all Profilers in this batch.
    // This enables them to be grouped later.
    recordCommitTime();
  }

  // Commit all the side-effects within a tree. We'll do this in two passes.
  // The first pass performs all the host insertions, updates, deletions and
  // ref unmounts.
  nextEffect = firstEffect;
  startCommitHostEffectsTimer();
  while (nextEffect !== null) {
    var _didError = false;
    var _error = void 0;
    {
      log(`(commitRoot)执行invokeGuardedCallback， 会更新UI`)
      invokeGuardedCallback(null, commitAllHostEffects, null);
  }
  stopCommitHostEffectsTimer();

  resetAfterCommit(root.containerInfo);

  // The work-in-progress tree is now the current tree. This must come after
  // the first pass of the commit phase, so that the previous tree is still
  // current during componentWillUnmount, but before the second pass, so that
  // the finished work is current during componentDidMount/Update.
  root.current = finishedWork;

  // In the second pass we'll perform all life-cycles and ref callbacks.
  // Life-cycles happen as a separate pass so that all placements, updates,
  // and deletions in the entire tree have already been invoked.
  // This pass also triggers any renderer-specific initial effects.
  nextEffect = firstEffect;
  startCommitLifeCyclesTimer();
  while (nextEffect !== null) {
    var _didError2 = false;
    var _error2 = void 0;
    {
      log(`(commitRoot)执行invokeGuardedCallback，会执行this.setState 的回调函数`)
      invokeGuardedCallback(null, commitAllLifeCycles, null, root, committedExpirationTime);
  }
  isCommitting$1 = false;
  isWorking = false;
  stopCommitLifeCyclesTimer();
  stopCommitTimer();
  onCommitRoot(finishedWork.stateNode);

  var updateExpirationTimeAfterCommit = finishedWork.expirationTime;
  var childExpirationTimeAfterCommit = finishedWork.childExpirationTime;
  var earliestRemainingTimeAfterCommit = childExpirationTimeAfterCommit > updateExpirationTimeAfterCommit ? childExpirationTimeAfterCommit : updateExpirationTimeAfterCommit;
  if (earliestRemainingTimeAfterCommit === NoWork) {
    // If there's no remaining work, we can clear the set of already failed
    // error boundaries.
    legacyErrorBoundariesThatAlreadyFailed = null;
  }
  onCommit(root, earliestRemainingTimeAfterCommit);
}
```

`commitRoot` 是一个很长的函数，也是一个很重要的函数。






























## 合成事件

1. 在执行合成事件时, 执行interactiveUpdates$1方法时， 在执行`try` `finally` 时，`finally` 中执行的` performSyncWork();` 是一个很重要的方法.


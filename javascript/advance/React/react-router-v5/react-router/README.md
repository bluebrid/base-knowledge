## 项目结构
1. `packages`是`react-router`的源码
2. `website`是一个`Demo`

## 运行项目
1. 在项目根目录下运行`npm run build`, 去构建源码, 构建工具是`rollup` , 我们可以尝试修改源码， 会实时监听变更
2. 运行`npm run start` 去启动Demo
3. 我们查看websit 里的源码，发现其引用`react-router` 的方式是：`import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";`,但是当我们修改`react-router`里面的源码时，会在demo中实时的体现出来，是因为在website 中配置的webpack文件中配置的：
```javascript
  resolve: {
    alias: {
      "react-router": path.resolve(__dirname, "../packages/react-router"),
      "react-router-dom": path.resolve(__dirname, "../packages/react-router-dom"),
      "history": path.resolve(__dirname, "../packages/history"),
    }
  },
```
4. 我们再分析`packages/react-router/rollup.config.js`文件，发现项目的入口文件是`modules/index.js`, 所以我们如果需要分析源码，所以入口文件应该是`modules/index.js`

## 源码分析
我们先看下基本的使用方式：
```javascript
import React from "react";
import { BrowserRouter as Router, Route, Link, Prompt } from "react-router-dom";
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message + ';custom prop')
  callback(allowTransition)
}
const PreventingTransitionsExample = () => (
  <Router getUserConfirmation={getConfirmation}>
    <div>
      <ul>
        <li>
          <Link to="/">Form</Link>
        </li>
        <li>
          <Link to="/one">One</Link>
        </li>
        <li>
          <Link to="/two">Two</Link>
        </li>
      </ul>
      <Route path="/" exact component={Form} />
      <Route path="/one" render={() => <h3>One</h3>} />
      <Route path="/two" render={() => <h3>Two</h3>} />
    </div>
  </Router>
);
```
我们发现我们其实引用的入口是`react-router-dom`, 而不是`react-router`库，其实因为react-router可以用于Web 也可以用于React-native, 但是其实部分差距， 但是底层都是`react-router`库，只是根据平台不同， 有相应的调整，所以在react-router 上层做了封装适用于不同的平台， 我们现在分析的是Web版本的，所以我们分析的是`react-router-dom`库

在上面的的代码中，我们引用的是`BrowserRouter`, 然后重命名为`Router`, `BrowserRouter`，就是针对Web的入口文件。

其实`BrowserRouter`很简单， 就是在`Router`组件上面进行了处理，传递了一个`history`的对象，**history**库是前端路由的<font size=4 color=red>核心</font>。但是如果我们使用了`BrowserRouter`，也就是相当于我们默认使用内置的history 库， 如果我们想自定义history ， 我们可以直接使用`react-router`的`router`， 然后传递自定义的`history`.


1. Link , 其实就是封装了一个`a`标签，并且阻止了默认事件
2. Route, 

## Router 实现原理
1. 前端路由基本上都是根据监听H5的`history` 的`popstate`和`hashchange`事件来实现的。
2. 我们在创建一个路由的是时候，最外层需要引用`Router`组件
```javascript
import { BrowserRouter as Router, Route, Link, Prompt , Redirect } from "react-router-dom";
 <Router basename="demo" forceRefresh={false} getUserConfirmation={getConfirmation}>
 ...
 </Router>
```
3. 在BrowserRouter组件中，我们创建了一个`history = createHistory(this.props)`， 并将这个对象作为props传递给`Router`组件
4. 我们在初始化`Router`组件的时候，我们调用的`history.listen`方法：
```javascript
    this.unlisten = props.history.listen(location => {
        if (this._isMounted) {
          // console.table(this.state.location)
          // console.table(location)
          this.setState({ location });
        } else {
          this._pendingLocation = location;
        }
      });
```
5. 在history中，暴露出的listen方法如下：
```javascript
 function listen(listener) {
    const unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return () => {
      checkDOMListeners(-1);
      unlisten();
    };
  }
```
6. 其中checkDOMListeners 是对history 进行最原始的popstate和hashchange 事件的监听
```javascript
  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);

      if (needsHashChangeListener)
        window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);

      if (needsHashChangeListener)
        window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }
```

## block 原理
1. 在组件中，添加一个`Prompt`的组件
```javascript
<Prompt
        when={isBlocking}
        message={location =>
          `Are you sure you want to go to ${location.pathname}`
        }
      />
```
2. 在组件中，添加事件，比如说Input的onchange 事件，然后去重新设置isBlocking 的值
3. 当这个组件重新render的时候，也会重新去render `Prompt`组件, 在组件的`onUpdate`生命周期中：
```javascript
  const method = context.history.block;

       onUpdate={(self, prevProps) => {
              if (prevProps.message !== message) {
                self.release();
                self.release = method(message);
              }
            }}
```
4. 在`history`的block方法如下：
```javascript

  function block(prompt = false) {
    const unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return () => {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }
```


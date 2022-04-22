 
## 前言
本系列将会根据一个简单的项目来学习**React-Router** 源码，要到达的目的有如下：
1. 学会使用React-Router
2. 在使用的基础上，分析React-Router 源码结构

可以下载项目[源码](https://github.com/bluebrid/react-router-learing),并按照如下步骤，将项目运行起来

`git clone git@github.com:bluebrid/react-router-learing.git`

`npm i`

`npm start`


![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/8/26/16575185f16b957b~tplv-t2oaga2asx-image.image)

运行的项目只是一个简单的React-Router 项目。

我们通过应用，一步步去解析React-Router 源代码.

## 查找入口文件

在我们clone 项目后，我们先找到入口文件， 也就是**src/index** 文件
```
ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
	, document.getElementById('root'));
```
其实很简单，就是React 的入口文件写法，**ReactDOM.render** 去Render 整个页面，但是我们发现一个问题，Render 的根组件是一个BrowserRouter 组件，查看其import 路径`import { BrowserRouter } from './react-router/packages/react-router-dom/modules';`, 发现其实React-Router 的一个组件，也就是我们学习React-Router 的入口文件，下面我们就来分析这个组件。

## BrowserRouter
查看源码，发现这个组件，只是重新render 了**Router**组件， 但是传了一个**history** 的props. **history** 是一个独立的第三方库，是实现路由的一个关键所在，我们后续会深入分析它.
```
import { createBrowserHistory as createHistory } from "../../../../history/modules";
```
```
history = createHistory(this.props);
```
```
  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
```
因为React-Router 是基于[history](https://github.com/ReactTraining/history)这个库，来实现对路由变化的监听，所以我们先对这个库进行简单的分析.
## history(第三方库)
1. 我们查看modules下面的[index.js](https://github.com/bluebrid/react-router-learing/blob/master/src/history/modules/index.js) 的源码，可以看出**history** 暴露出了七个方法:
```
import createBrowserHistory from "./createBrowserHistory";
import createHashHistory from "./createHashHistory";
import createMemoryHistory from "./createMemoryHistory";
import { createLocation, locationsAreEqual } from "./LocationUtils";
import { parsePath, createPath } from "./PathUtils";
export {
    createBrowserHistory,
    createHashHistory,
    createMemoryHistory,
    createLocation,
    locationsAreEqual,
    parsePath,
    createPath
}
```
我们上一节分析**BrowserRouter** , 其**history** 引用的是　**createBrowserHistory** 方法，所以我们接下来主要分析这个方法.

## history(createBrowserHistory.js)
如果我们用VS Code 打开源码，我们可以用`Ctrl + k` `Ctrl + 0(数字0)` 组合键，我们可以查看这个[文件](https://github.com/bluebrid/react-router-learing/blob/master/src/history/modules/createBrowserHistory.js)源码结构.
这个文件暴露出了一个对象, 也就是我们可以用的方法:
```
  const history = {
    length: globalHistory.length,
    action: "POP",
    location: initialLocation,
    createHref,
    push,
    replace,
    go,
    goBack,
    goForward,
    block,
    listen
  };
```
我们接下来我们会分析其中几个重要的方法
### listen
listen 是一个最主要的方法，在**Router** 组件中有引用，其是实现路由监听的功能，也就是**观察者** 模式.下面我们来分析这个方法:
```
  const listen = listener => {
    const unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);

    return () => {
      checkDOMListeners(-1);
      unlisten();
    };
  };
```
其中checkDOMListeners 方法，是真正实现了路由切换的事件监听：
```
  //注册路由监听事件
  const checkDOMListeners = delta => {
    // debugger
    listenerCount += delta;

    if (listenerCount === 1) {
      window.addEventListener(PopStateEvent, handlePopState);

      if (needsHashChangeListener)
        window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);

      if (needsHashChangeListener)
        window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  };
```
其中**window** 监听了两种事件: **popstate** 和**hashchange**,这两个事件都是HTML5中的API，也就是原生的监听URL变化的事件.

分析事件监听的回调函数**handlePopState** ,其最终是通过**setState** 来出发路由监听者，
```
  const setState = nextState => {
    Object.assign(history, nextState);

    history.length = globalHistory.length;

    transitionManager.notifyListeners(history.location, history.action);
  };
```
其中**notifyListeners** 会调用所有的**listen** 的回调函数，从而达到通知监听路由变化的监听者

在下面的Router 组件的**componentWillMount** 生命周期中就调用了`history.listen`调用，从而达到当路由变化， 会去调用`setState` 方法， 从而去Render 对应的路由组件。
## Router
1. 我先查看**render** 方法
```
  render() {
    const { children } = this.props;
    return children ? React.Children.only(children) : null;
  }
```
很简单，只是将chiildren 给render 出来

2. 我们接下来分析这个组件的所有的生命周期函数

  * componentWillMount
  ```
    componentWillMount() {
    const { children, history } = this.props;
    this.unlisten = history.listen(() => {
      this.setState({
        match: this.computeMatch(history.location.pathname)
      });
    });
  }
  ```
  在这个方法中，注册了对history 路由变更的监听，并且在监听后去变更状态
  
  * componentWillUnmount
  ```
    componentWillUnmount() {
    this.unlisten();
  }
  ```
  当组件卸载时，注销监听.
  
  由此分析，**Router**最主要的功能就是去注册监听history 路由的变更，然后重新render 组件。
  
  分析到此，我们发现跟React-Router已经断开了联系，因为后面所有的事情都是去render **children**,
  我们接下来继续返回到index.js文件中:
  ```
  ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
	, document.getElementById('root'));
  ```
  我们发现**children** 就是`<App/>`组件了，我们去查看APP的代码，还是先查看**render**：
  ```
  class App extends Component {

  render() {

    return (
      <div>
       <nav className="navbar navbar">     
        <ul className="nav navbar-nav">
          <li><Link to="/">Homes</Link></li>
          <li><Link to="/category">Category</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/admin">Admin area</Link></li>
        </ul>
       </nav>
      
       <Switch>
        <Route path="/login"  render={(props) => <Login {...props} />} />
        <Route exact path="/" component={Home}/>
        <Route path="/category" component={Category}/>
        <PrivateRoute path='/admin' component = {Admin} />
        <Route path="/products" component={Products}/>
       </Switch>
      </div>
    );
  }
}
  ```
  非常显眼的是:**Switch** 组件，经查看是React-Router 的一个组件，我们接下来就分析Switch组件
  
  ## Switch
  ```
    render() {
    const { route } = this.context.router;
    const { children } = this.props;
    const location = this.props.location || route.location;

    let match, child;
    React.Children.forEach(children, element => {
      if (match == null && React.isValidElement(element)) {
        const {
          path: pathProp,
          exact,
          strict,
          sensitive,
          from
        } = element.props;
        const path = pathProp || from;

        child = element;
        match = matchPath(
          location.pathname,
          { path, exact, strict, sensitive },
          route.match
        );
      }
    });
    return match
      ? React.cloneElement(child, { location, computedMatch: match })
      : null;
  }
  ```
  其中最明显的一块代码就是: React.Children.forEach ， 去遍历**Switch** 下面的所有的children, 然后根据**path** 去匹配对应的children, 然后将匹配到的children render 出来。
  
  而Switch 的所有的Children 是一个Route 组件，我们接下来就要分析这个组件的源代码
  
  Switch 的主要功能就是根据**path** 匹配上对应的children, 然后去Render 一个元素`React.cloneElement(child, { location, computedMatch: match })`
  ## Route
  从app.js 中，发现 Route 使用方式是`<Route exact path="/" component={Home}/>`
  ```
  render() {
    const { match } = this.state;
    const { children, component, render } = this.props;
    const { history, route, staticContext } = this.context.router;
    const location = this.props.location || route.location;
    const props = { match, location, history, staticContext };
    
    if (component) return match ? React.createElement(component, props) : null;

    if (render) return match ? render(props) : null;

    if (typeof children === "function") return children(props);

    if (children && !isEmptyChildren(children))
      return React.Children.only(children);

    return null;
  }
  ```
  
从render 方法可以知道，其中有三个重要**props**, 决定了怎么去render 一个路由。
1. component (直接传递一个组件， 然后去render 组件)
2. render (render 是一个方法， 通过方法去render 这个组件)
3. children (如果children 是一个方法， 则执行这个方法， 如果只是一个子元素，则直接render 这个元素)

在render组件的时候，都会将**props** 传递给子组件

**props = {match, location, history, staticContext} 这些属性在组件中会有很大的用途**

### 使用方式
从上面的代码可以发现Route的使用方式有四种:
1. `<Route exact path="/" component={Home}/>` 直接传递一个组件
2. `<Route path="/login"  render={(props) => <Login {...props} />} />` 使用render 方法
3. `<Route path="/category"> <Category/><Route/>`
4. `<Route path="/category" children={(props) => <Category {...props} />} />` 跟render 使用方式一样

### props(参数)

上面我们已经分析了render 方法，我们现在需要分析**props**, 因为理解了**render** 方法，也就是知道这个组件的实现原理，
理解了**props**, 就会理解这个组件可以传递哪些属性，从而可以达到更好的使用**Route**组件.
```
  static propTypes = {
    computedMatch: PropTypes.object, // private, from <Switch>
    path: PropTypes.string,
    exact: PropTypes.bool,
    strict: PropTypes.bool,
    sensitive: PropTypes.bool,
    component: PropTypes.func,
    render: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    location: PropTypes.object
  };
```
下面我们一一来分析这些属性的用途:
1. path 很简单，就是一个字符串类型，也就是我们这个路由要匹配的的URL路径.
2. component, 居然是个func 类型， 我们上面分析**render** 方法，发现conponent 传递的是一个组件.其实React component 其实就是一个function .不管是Class component 或者是一个函数式组件，其实说白了都是function(typeof App === 'function')
3. render, 上面在render 方法也已经分析，其实是通过一个function 来render 一个组件
4. children 上面render 方法也已经分析了
5. **computedMatch** 是从Switch 传递过来的，就是Switch 组件已经找到对应的match.这个也是**Switch** 组件的主要功能， 就是用**Swtich** 包裹所有的**Route** 组件，在Switch 中已经查找到对应的Route组件了，　不用将Switch 下面的所有的Route 去Render一遍了。也是性能提升的一个方式。


上面我们已经分析了我们使用过的四个props, 我们接下来分析我们没有使用过的几个props,但是其实在特殊环境中是很有作用:
1. exact 从字面意义上理解是“精确的”，也就是要精确去匹配路径， 举个例子: 
```
     <Switch>
        <Route path="/login"  render={(props) => <Login {...props} />} />
        <Route path="/" component={Home}/>
        <Route path="/category" children={(props) => <Category {...props} />} />
        <PrivateRoute path='/admin' component = {Admin} />
        <Route path="/products" component={Products}/>
       </Switch>
```
上面"/" 路径会匹配所有的路径如果:/login /category ...., 但是我们需要"/" 只匹配 Home , 我们需要变更如:`<Route exact path="/" component={Home}/>`

2. strict 从字面上理解是“严格的”,也就是严格模式匹配,对后面的"/" 也是需要匹配上的， 如: `<Route strict path="/one/" component={About}/>` 只会匹配/one/ 或者/one/two 不会匹配 /one
3. sensitive 用来设置path 匹配**是否区分大小写**，如果设置了这个值，是区分大小写的，如: `<Route sensitive path="/one" component={About}/>` 只会匹配/one 不会匹配/One or /ONe
4. location
5. computedMatch, 是一个私有的属性，我们不会使用

Route 组件最主要的功能，是匹配URL 然后render出组件， 其中匹配的逻辑是是其核心的功能，我们后续会分析其匹配的过程,[源码](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/modules/matchPath.js).

## Link

TODO......






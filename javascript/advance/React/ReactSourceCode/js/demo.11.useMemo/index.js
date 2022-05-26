
const $root = document.querySelector("#root11");

function Button1({ name, children }) {
  function changeName(name) {
    console.log('Demo1: 调用changeName 方法');
    return name + '改变name的方法';
  }

  const otherName = changeName(name);
  return (
    <div>
      <div>{otherName}</div>
      <div>{children}</div>
    </div>

  )
}

function Button2({ name, children }) {
  function changeName(name) {
    console.log('Demo2: 调用changeName 方法');
    return name + '改变name的方法';
  }
  // 在修改content 值的时候， 是没有改变name的值， 所以用React.useMemo 包裹的方法，都不会再次执行
  // 所以React.useMemo的方法，要是一个纯函数， 也就是， 输入什么值，一定对应一个相应的输出的值
  const otherName = React.useMemo(() => changeName(name), [name]);
  return (
    <div>
      <div>{otherName}</div>
      <div>{children}</div>
    </div>

  );
}

/**
 * 1. 第一次渲染的时候， 直接执行nextCreate 方法产生nextVaue , nextCreate 也就是我们执行React.memo 方法的第一个参数
 * function mountMemo(nextCreate, deps) {
    var hook = mountWorkInProgressHook();
    var nextDeps = deps === undefined ? null : deps;
    var nextValue = nextCreate();
    hook.memoizedState = [nextValue, nextDeps];
    return nextValue;
    }
 * 2. 后面修改值的时候： 执行updateMemo方法
 * function updateMemo(nextCreate, deps) {
    var hook = updateWorkInProgressHook();
    var nextDeps = deps === undefined ? null : deps;
    var prevState = hook.memoizedState;
    if (prevState !== null) {
        // Assume these are defined. If they're not, areHookInputsEqual will warn.
        if (nextDeps !== null) {
        var prevDeps = prevState[1];
        if (areHookInputsEqual(nextDeps, prevDeps)) {
            return prevState[0];
        }
        }
    }
    var nextValue = nextCreate();
    hook.memoizedState = [nextValue, nextDeps];
    return nextValue;
    }
 */

function App() {
  const [name, setName] = React.useState('名称');
  const [content, setContent] = React.useState('内容');
  return (
      <div className="section" data-title="11 hooks: useMemo">
        <button onClick={() => setName(new Date().getTime())}>name</button>
        <button onClick={() => setContent(new Date().getTime())}>content</button>
        <Button1 name={name}>{content}</Button1>
        <Button2 name={name}>{content}</Button2>
      </div>
  )
}

const root = ReactDOM.createRoot(
  $root
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDOM.render(<App />, $root);

/**
 * hooks
 */

const $root = document.querySelector("#root7");
 
function App() {
    /**
     * 1. React.useState 的参数可以是一个对象或者是一个函数
     * if (typeof initialState === 'function') {
          initialState = initialState();
        }
       2. var dispatch = queue.dispatch = dispatchAction.bind(null,currentlyRenderingFiber$1, queue); 这个dispatch 是一个bind过的函数， 已经传递了两个参数： 当前的FiberNode, 和queue
     * 3. useState 返回的是一个数组： return [hook.memoizedState, dispatch];
     * 4. setCount 的参数也可以是一个函数或者是一个新的状态值： 
     *    setCount(count + 1)
     *    setCount((currentValue) => currentValue + 1) // 这样可以灵活做很多事情
     */

    const [count, setCount] = React.useState(0)
    // const [count1, setCount1] = React.useState(100)
    return (
      <button onClick={() => {
        setCount(count + 1)
        // setCount1(count1 + 100)
      }}>
          Click me ({count}) -({1})
      </button>
    )
}

ReactDOM.render(<App />, $root);



























// http://prismjs.com/plugins/normalize-whitespace/
Prism.plugins.NormalizeWhitespace.setDefaults({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true
  /*'break-lines': 80,
                     'indent': 2,
                     'remove-initial-line-feed': false,
                     'tabs-to-spaces': 4,
                     'spaces-to-tabs': 4*/ });
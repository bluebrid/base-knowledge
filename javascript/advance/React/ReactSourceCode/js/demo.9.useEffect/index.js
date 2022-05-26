const $root = document.querySelector("#root9");

/**
 * 1. React.useEffect, 在pushEffect 方法中首先创建一个对象，并保存在全局变量componentUpdateQueue.lastEffect中： componentUpdateQueue.lastEffect = effect.next = effect;
   var effect = {
    tag: tag,
    create: create,
    destroy: destroy,
    deps: deps,
    // Circular
    next: null
  };
  其中： create 是我们在执行React.useEffect 方法传递的第一个参数方法
         destory 在这里还是一个undefined 的值, 在执行commitHookEffectList 方法时才会生成destory 的值
         deps: 就是我们在执行React.useEffect传递的第二个参数： [width]
 * 2.  在renderWithHooks方法中：将componentUpdateQueue 赋值给currentlyRenderingFiber$1.updateQueue 上
     *  var renderedWork = currentlyRenderingFiber$1;
     *  renderedWork.updateQueue = componentUpdateQueue;
 * 3. 在创建完对应的组件后， 会执行commitHookEffectList 方法， 这个方法会执行create方法， 并且生成一个destory 的函数
      function commitHookEffectList(unmountTag, mountTag, finishedWork) {
        var updateQueue = finishedWork.updateQueue; // updateQueue 就是在第二步的时候赋值的
        var lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;// updateQueue.lastEffect 即使我们在第一步生成的effect 对象
        if (lastEffect !== null) {
            var firstEffect = lastEffect.next; // 第一步生成的effect 对象
            var effect = firstEffect;
            do {
            if ((effect.tag & unmountTag) !== NoEffect$1) {
                // Unmount
                var destroy = effect.destroy;
                effect.destroy = undefined;
                if (destroy !== undefined) { 
                    // 在第一次渲染的时候， destory 是undefined ， 所以不会执行destory 方法
                    // 在第一渲染后， 会执行下面的方法：effect.destroy = create();destory 应该会有值了
                    // 在没执行effect.create 之前都会先执行destory 函数， 
                    // 所以useEffect 相当于是注册事件， 但是其会返回一个destory 函数
                    // 再次执行useEffect 的时候需要进行取消事件，  
                    destroy();
                }
            }
            if ((effect.tag & mountTag) !== NoEffect$1) {
                // Mount
                var create = effect.create;
                effect.destroy = create(); // 执行create方法，其实也就是我们React.useEffect 传递的第一个函数参数， 其对应的返回值作为effect的destory 函数
                

                {
                var _destroy = effect.destroy;
                if (_destroy !== undefined && typeof _destroy !== 'function') {
                    var addendum = void 0;
                    if (_destroy === null) {
                    addendum = ' You returned null. If your effect does not require clean ' + 'up, return undefined (or nothing).';
                    } else if (typeof _destroy.then === 'function') {
                    addendum = '\n\nIt looks like you wrote useEffect(async () => ...) or returned a Promise. ' + 'Instead, write the async function inside your effect ' + 'and call it immediately:\n\n' + 'useEffect(() => {\n' + '  async function fetchData() {\n' + '    // You can await here\n' + '    const response = await MyAPI.getData(someId);\n' + '    // ...\n' + '  }\n' + '  fetchData();\n' + '}, [someId]); // Or [] if effect doesn\'t need props or state\n\n' + 'Learn more about data fetching with Hooks: https://fb.me/react-hooks-data-fetching';
                    } else {
                    addendum = ' You returned: ' + _destroy;
                    }
                    warningWithoutStack$1(false, 'An effect function must not return anything besides a function, ' + 'which is used for clean-up.%s%s', addendum, getStackByFiberInDevAndProd(finishedWork));
                }
                }
            }
            effect = effect.next;
            } while (effect !== firstEffect);
        }
        }
 */
function App() {
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    console.log("===============>Pre Width", width);
    const handleResize = () => {
      console.log("===============>Current Width", window.innerWidth);
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      // 返回一个函数来进行取消事件监听
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);
  return (
    <div>
      <p> window width is {width}</p>
      <input defaultValue={width}/>
    </div>
  );
}
ReactDOM.render(<App />, $root);

// http://prismjs.com/plugins/normalize-whitespace/
Prism.plugins.NormalizeWhitespace.setDefaults({
  "remove-trailing": true,
  "remove-indent": true,
  "left-trim": true,
  "right-trim": true
  /*'break-lines': 80,
                     'indent': 2,
                     'remove-initial-line-feed': false,
                     'tabs-to-spaces': 4,
                     'spaces-to-tabs': 4*/
});

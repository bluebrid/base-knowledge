import React, { useState, useEffect } from 'react'
// 1. 如果第二个参数，没有传， 则相当于，首次和更新状态，都会执行
// 2. 第二个参数如果为一个空数组[], 则相当于componentDidMount,只执行一次

/**
 * useEffect 相当于是监听useState 的值的改变后要处理的事件
 * 1. useEffect 方法只是相当于注册了一个事件， 将对应的effectHook 保存在workInProgressHook中， 可以实现多个hook , 因为用next 指向
 *  function mountWorkInProgressHook() {
      var hook = {
        memoizedState: null,
        baseState: null,
        queue: null,
        baseUpdate: null,
        next: null
      };

      if (workInProgressHook === null) {
        // This is the first hook in the list
        firstWorkInProgressHook = workInProgressHook = hook;
      } else {
        // Append to the end of the list
        workInProgressHook = workInProgressHook.next = hook;
      }

      return workInProgressHook;
    }
 *  function mountEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
      var hook = mountWorkInProgressHook();
      var nextDeps = deps === undefined ? null : deps;
      sideEffectTag |= fiberEffectTag;
      hook.memoizedState = pushEffect(hookEffectTag, create, undefined, nextDeps);
    }
 * 2. 当组件render(renderRoot 方法)完成后， 会去执行flushPassiveEffects -> commitHookEffectList 提交所有的effectList
    function commitHookEffectList(unmountTag, mountTag, finishedWork) {
      var updateQueue = finishedWork.updateQueue;
      var lastEffect = updateQueue !== null ? updateQueue.lastEffect : null;

      if (lastEffect !== null) {
        var firstEffect = lastEffect.next;
        var effect = firstEffect;

        do {
          if ((effect.tag & unmountTag) !== NoEffect$1) {
            // Unmount
            var destroy = effect.destroy;
            effect.destroy = undefined;

            if (destroy !== undefined) {
              destroy();
            }
          }

          if ((effect.tag & mountTag) !== NoEffect$1) {
            // Mount
            var create = effect.create;
            effect.destroy = create();
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
  * 3. 返回的是 effect.destroy = create();并将返回的销毁函数保存在effect上， 所以useEffect传递的一个参数(create)， 返回一个函数，用来注销对应的事件
  * 4. 每次执行effectHook 的时候， 会先执行destroy();函数
  * 5. useEffect 可以传递第二个参数， 第二个参数是一个数组， 用来判断上一次和当前的值是否相等，如果相等， 则useEffect则不会运行
  * 6. useEffect 是在render之后执行的，已经可以获取最新的Dom 元素
 */
function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)
  useEffect(
    () => {
      /**
       * 1. 在第一次加载组件的时候，回执行整个方法，然后会执行useEffect 函数，会执行里面的第一个参数函数，然后注册了事件
       * 2. 在缩小或者放大页面大小的时候，就会进入resize 事件，然后执行setWidth 钩子函数
       * 3. 然后重新渲染整个组件函数，重新注册一个resize事件，但是会判断上一个effect 有没有返回一个函数，如果返回了一个函数
       * 则先执行整个函数，所以在这个返回函数中添加取消事件监听函数
       * 4. 在执行useEffect 会去判断上一次和这一次的传递的第二个参数是否一样，如果一样，则不会执行。
       */
      console.log('===============>Pre Width', width)
      console.log('windowWidth Value:' + document.querySelector('#windowWidth').value);
      const handleResize = () => {
        console.log('===============>Current Width', window.innerWidth);
        setWidth(window.innerWidth)
      }
      window.addEventListener('resize', handleResize)
      return () => { // 返回一个函数来进行取消事件监听
        window.removeEventListener('resize', handleResize)
      }
    },
    [width]
  )
  return (
    <>
    <p> window width is {width}</p>
    <input value={width} id='windowWidth' />
    </>
    
  )
}
export default WindowWidth
1. useEffect ，会传递两个参数，第一个是callback, 第二个是deps(依赖)数组
2. 如果第二个参数，没有传递， 则每次更新状态，都会执行，类似Class组件的UpdateDidMount 
3. 如果第二个参数，传递一个空数组， 则只会第一次Render执行，类似class组件的DidMount
4. 第一个参数callBack,可以返回一个函数，后面再次执行之前，会先去判断是否有个返回， 如果又返回的函数， 会先去执行这个返回的函数，然后再次取执行callBack, 使用场景是在callback 进行时间注册等， 在返回的函数中，去取消事件的注册，还有setInterval 等事件的注销事件(**effect.destory**)
```javascript
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
```

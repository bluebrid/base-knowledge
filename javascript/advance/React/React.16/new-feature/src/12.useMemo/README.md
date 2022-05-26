1. useMemo 是防止一些没必要执行的方法反复执行
2. useCallback 是防止一些方法反复创建， 
3. useMemo 的方法要是一个纯函数， 也就是输入什么，输出的结果一定是一样的,react 就是根据这个原理，来判断上一次的输入和这一次的输入是否一致，
如果一致，则返回上一次执行的结果， 否则执行相应的函数
```javascript
 function updateMemo(nextCreate, deps) {
      var hook = updateWorkInProgressHook();
      var nextDeps = deps === undefined ? null : deps;
      var prevState = hook.memoizedState;

      if (prevState !== null) {
        // Assume these are defined. If they're not, areHookInputsEqual will warn.
        if (nextDeps !== null) {
          var prevDeps = prevState[1];

          if (areHookInputsEqual(nextDeps, prevDeps)) {// 判断是一个的输入值和下一个输入值是否相等
            return prevState[0];
          }
        }
      }
    var nextValue = nextCreate(); // 上一个输入值和下一个的输入值不相等， 则执行nextCreate，也就是我们useMemo包裹的函数
    // 将新执行的结果缓存起来
    hook.memoizedState = [nextValue, nextDeps];
    return nextValue;
}
```
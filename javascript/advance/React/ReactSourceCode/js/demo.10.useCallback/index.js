const $root = document.querySelector("#root10");

let Search = React.memo((props) => {
  const { handleSearchId } = props
  console.log('Demo3: Search Component 被渲染了')
  return (
    <div>
      <input onChange={(e) => { handleSearchId(e) }} />
    </div>
  )
})

let Detail = React.memo(() => {
  console.log('Demo3: Detail Component 被渲染了')
  return (
    <div>test</div>
  )
})


/**
 * 1, useCallback 的功能是， 根据第二个参数， 与之前的第二个参数是否一样， 如果一样， 则从从memoizedState 中获取对应的callback 
 * function updateCallback(callback, deps) {
    var hook = updateWorkInProgressHook();
    var nextDeps = deps === undefined ? null : deps;
    var prevState = hook.memoizedState;
    if (prevState !== null) {
        if (nextDeps !== null) {
        var prevDeps = prevState[1];
        if (areHookInputsEqual(nextDeps, prevDeps)) {
            return prevState[0];// 返回之前的回调函数
        }
        }
    }
    hook.memoizedState = [callback, nextDeps]; // 这个是首次渲染，
    return callback;
    }
 * 2. 在updateWorkInProgressHook 中会先
   function updateWorkInProgressHook() {
  
  if (nextWorkInProgressHook !== null) {
    // There's already a work-in-progress. Reuse it.
    workInProgressHook = nextWorkInProgressHook;
    nextWorkInProgressHook = workInProgressHook.next;

    currentHook = nextCurrentHook;
    nextCurrentHook = currentHook !== null ? currentHook.next : null;
  } else { // 不是首先， 则会走else 分支， 获取之前的nextCurrentHook 的memoizedState
    // Clone from the current hook.
    !(nextCurrentHook !== null) ? invariant(false, 'Rendered more hooks than during the previous render.') : void 0;
    currentHook = nextCurrentHook;

    var newHook = {
      memoizedState: currentHook.memoizedState,

      baseState: currentHook.baseState,
      queue: currentHook.queue,
      baseUpdate: currentHook.baseUpdate,

      next: null
    };

    if (workInProgressHook === null) {
      // This is the first hook in the list.
      workInProgressHook = firstWorkInProgressHook = newHook;
    } else {
      // Append to the end of the list.
      workInProgressHook = workInProgressHook.next = newHook;
    }
    nextCurrentHook = currentHook.next;
  }
  return workInProgressHook;
}
 */
let Home = () => {
  console.log('Demo3: Home Component 被渲染了')
  const [searchId, setSearchId] = React.useState(0)
  const ref = React.useRef()

  React.useLayoutEffect(() => {
    ref.current = searchId
  }, [searchId])

  const handleSearchIdChange = (e) => {
    console.log('Demo3: handleSearchChange 被执行了')
    setSearchId(e.target.value)
  };

  const handleSearchIdChangeUseCallback = React.useCallback((e) => {
    console.log('Demo3: handleSearchChange 被执行了')
    setSearchId(e.target.value)
  }, [ref])

  return (
    <div>
      <Search handleSearchId={handleSearchIdChangeUseCallback} />
      <Detail />
    </div>
  )
}

ReactDOM.render(<Home />, $root);

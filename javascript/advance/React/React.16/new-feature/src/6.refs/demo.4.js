// https://juejin.im/post/5d8f478751882509563a03b3
// https://juejin.im/post/5e5c5f6a6fb9a07cad3ba383
import React , {useState, useRef, useEffect} from 'react'

function usePrevious(value) {
    const ref = useRef(value)
    useEffect(() => {// useEffect 是在render组件完成后才执行的， 相当于componentDidmount 钩子
        ref.current = value // 这里才算拿到最新的值，但是是在组件render完成后
    })
    return ref.current // 这里拿到的是上一个值
}

export default () => {
    const [count, setCount] = useState(0);
    /**
     * 在class时代，由于组件节点是通过class实例化而得，因此可以在类实例上存放内容，这些内容随着实例化产生，随着componentWillUnmount销毁。
     * 但是在hook的范围下，函数组件并没有this和对应的实例，因此useRef作为这一能力的弥补，扮演着跨多次渲染存放内容的角色。
     * 1. useRef 就相当于维护了一个class组件的实例化属性
     * 2. useRef 返回的是一个可变的ref对象，初始化值是useRef传入的参数， 所谓的可变，就是其对应的值，可以通过ref.current 去赋值， 
     * 3. react 组件，有四个阶段： render(渲染)-> reconciliation() -> Layout(布局) -> commit(提交) // https://juejin.im/post/5e5c5f6a6fb9a07cad3ba383
     * 4. render 阶段， 不允许有副作用， 因为有可能被暂停，中断，重新执行
     * 5. commit 阶段， 可以操作Dom, 运行有副作用的操作，然后重新安排更新(在Hooks中， useEffect, useLayoutEffect 就是可以去操作副作用的地方)
     */
    /*
    react-dom.development.js
    在react-dom 中， ReactSharedInternals 指向的就是react.js中的ReactSharedInternals
    var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
    在renderWithHooks 方法中, 设置不同的阶段，使用不同的hooksDispatcher 配置：
          {
        if (nextCurrentHook !== null) {
          ReactCurrentDispatcher$1.current = HooksDispatcherOnUpdateInDEV;
        } else if (hookTypesDev !== null) {
          ReactCurrentDispatcher$1.current = HooksDispatcherOnMountWithHookTypesInDEV;
        } else {
          ReactCurrentDispatcher$1.current = HooksDispatcherOnMountInDEV;
        }
      }
    // 第一次：
    // HooksDispatcherOnMountInDEV 17198
    useRef: function useRef(initialValue) {
        currentHookNameInDev = 'useRef';
        mountHookTypesDev();
        return mountRef(initialValue);
      },
      后面的过程 HooksDispatcherOnUpdateInDEV 17360
    useRef: function useRef(initialValue) {
        currentHookNameInDev = 'useRef';
        updateHookTypesDev();
        return updateRef(initialValue);
      },
      */
    const prevCountRef = useRef(count);
    const prevCount = prevCountRef.current;

    useEffect(() =>{
        prevCountRef.current = count;
        console.log('useEffect:', prevCountRef)
    }, [count]);
    
    return (
        <div>
            <button onClick={() => { setCount( count + 1 ) }}>加1</button>
            <p>count: {count}</p>
            <p>prevCount: {prevCount}</p>
        </div>
    )
}

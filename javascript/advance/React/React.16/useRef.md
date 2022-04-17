1. 在class时代，由于组件节点是通过class实例化而得，因此可以在类实例上存放内容，这些内容随着实例化产生，随着componentWillUnmount销毁。
2. 但是在hook的范围下，函数组件并没有this和对应的实例，因此useRef作为这一能力的弥补，扮演着跨多次渲染存放内容的角色。
3. useRef 就相当于维护了一个class组件的实例化属性
4. useRef 返回的是一个可变的ref对象，初始化值是useRef传入的参数， 所谓的可变，就是其对应的值，可以通过ref.current 去赋值， 
5. react 组件，有四个阶段： render(渲染)-> reconciliation() -> Layout(布局) -> commit(提交) // https://juejin.im/post/5e5c5f6a6fb9a07cad3ba383
6.  render 阶段， 不允许有副作用， 因为有可能被暂停，中断，重新执行
7. commit 阶段， 可以操作Dom, 运行有副作用的操作，然后重新安排更新(在Hooks中， useEffect, useLayoutEffect 就是可以去操作副作用的地方)
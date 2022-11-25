
## [useTranstion && useDeferredValue && startTranstion](https://segmentfault.com/a/1190000042189201)

React 18 更新分为两类
1. <font color=red>紧急更新（urgent update）：</font>用户期待马上相应的更新操作，例如键盘敲入或鼠标点击
2. <font color=red>过度更新（transtion update）：</font>一些延迟可以接受的更新操作，如查询，搜索推荐，搜索结果响应
3. React 18 标记为<font color=red>transtion</font>的更新，即为<font color=red>过渡更新</font>
4. 通过<font color=red>区分更新优先级</font>，让高优先级的事件保持响应，提高用户体验，保持页面响应

> useTransition 返回一个延迟响应的状态,<font color=red>可以设置最长延迟时间timeoutMs。如果给定的timeoutMs内未完成，它将会强制更新。</font>
> 与useDeferredValue的不同： useDeferredValue是处理一段逻辑，而useTransition是产生一个新状态。
> useDeferredValue通过useEffect监听传入值的变化，然后通过过渡任务执行值的改变。
> 这样保证defrredValue的更新滞后于setState，同时符合过渡更新的原则，因为是通过transition 调度机制执行的。
 
## 区别（setTimeout）
> 1. `setTimeout` 是<font colo=red>延时执行</font>，`startTranstion`是立即执行，传递给startTranstion 的函数是同步运行，但是内部会标记为<font colo=red>非紧急</font>，React将在稍后更新这些updates，会比setTimeout 更早的render
> 2. 如果setTimeout,<font colo=red>包裹大面积的更新操作</font>，会导致整个页面阻塞不可交互，一些紧急操作，比如说用户输入，键盘操作等都将被阻塞
> 3. startTranstion 则不同， 由于标记的更新是<font colo=red>可中断</font>，是不会阻塞UI
> 4. 因为setTimeout 是异步执行， 哪怕只是展示一个小小的loading也要编写异步代码。而通过transitions，React可以使用hook来追踪transition的执行状态，根据transition的当前状态来更新loading。

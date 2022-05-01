https://mp.weixin.qq.com/s/lLvh72ZEbUqpRJfUtpNedQ
1. Concurrent Mode(并发模式)
> 以前得版本，更新是一个串行过程， 触发更新 -> 准备虚拟Dom -> 渲染真实Dom

> 并发模式后， React在每一次执行过程中，都会执行每一个Fiber,看看有没有优先级更高的更新，
如果有，就会去中断当前低优先级的，待高优先级的执行完成后，在执行，  
![](https://mmbiz.qpic.cn/mmbiz_jpg/Zf3Qju4se7th3ARn1mIdpyJHFfmxnZD7ABeamZ9VnN6K5Wsq4YdzT5VGQjKmZlIP9UgNSvWs6bv6jCUiaGJOauA/640?wx_fmt=jpeg&wxfrom=5&wx_lazy=1&wx_co=1)

2. startTranstion 来设置优先级
> react 更新分出两种类型， **紧急更新**（需要立即响应，如输入框的输入） 和 **过度更新**（不需要立即响应， 如果动画效果渲染，调用API搜索数据等）
```jsx
import React, { useState, useTransition } from "react";
 const [isLeaning, startLeaning] = useTransition();
   function changeTreeLean(event) {
        const value = Number(event.target.value);
        setTreeLeanInput(value); // update input

        // update visuals
        if (enableStartTransition) {
            startLeaning(() => {
                setTreeLean(value);
            });
        } else {
            setTreeLean(value);
        }
    }
```

3. 自动批处理(Automatic batching)
> 之前的版本，只有在**合成事件** 和 **生命周期**中调用useState 和 setState 才会进行批量处理
> 在**原生事件**, **setTimeout**, **Promise** 中调用useState 和 setState 是不会进行批量处理的

4. 如果想在某些场景下， 不想批量处理， 可以通过`flushSync` 来强制同步（比如说你更新状态后， 要立即拿到Dom）
```jsx
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCounter(c => c + 1);
  });
  // React 更新一次 DOM
  flushSync(() => {
    setFlag(f => !f);
  });
  // React 更新一次 DOM
}
```

5. [流式SSR](https://github.com/reactwg/react-18/discussions/37)
SSR流程：
> 1. 服务的fetch页面所需要的数据
> 2. 数据准备好之后， 将组件渲染成String的形式作为response 返回
> 3. 客户端加载资源
> 4. 客户端合成（hydrate）合成最终的页面内容

You no longer have to wait for all the data to load on the server before sending HTML. Instead, you start sending HTML as soon as you have enough to show a shell of the app, and stream the rest of the HTML as it’s ready.

You no longer have to wait for all JavaScript to load to start hydrating. Instead, you can use code splitting together with server rendering. The server HTML will be preserved, and React will hydrate it when the associated code loads.

You no longer have to wait for all components to hydrate to start interacting with the page. Instead, you can rely on Selective Hydration to prioritize the components the user is interacting with, and hydrate them early.

在传统的SSR中，上述的流程式串行的， 如果其中一个步骤比较慢， 都会影响整个渲染的速度
> 1. React18 支持全新的`suspense`, 支持了流式SSR， 也就是运行服务端一点点的返回页面内容

6. 新的Hooks
> 1. useDefferedValue, 可以让一个Value 延迟生效， 也就是低优先级更新, 配置**lean**
```jsx
const [treeLeanInput, setTreeLeanInput] = useState(0);

const deferredValue = useDeferredValue(treeLeanInput);

function changeTreeLean(event) {
  const value = Number(event.target.value);
  setTreeLeanInput(value)
}

return (
  <>
    <input type="range" value={treeLeanInput} onChange={changeTreeLean} />
    <Pythagoras lean={deferredValue} />
  </>
)
```
> 2. 支持useId(),支持同一个组件生成一个唯一的ID
> 3. **useSyncExternalStore** : useSyncExternalStore 一般是三方状态管理库使用，一般我们不需要关注。
> 4. **useInsertionEffect** 这个 Hooks 只建议 css-in-js库来使用。这个 Hooks 执行时机在 DOM 生成之后，useLayoutEffect 生效之前，一般用于提前注入 <style> 脚本。
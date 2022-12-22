## [React Streaming SSR 原理解析](https://mp.weixin.qq.com/s/qJ6vU5CdgKXsrZweawIqQA)
## [React组件处理异步数据](http://www.qb5200.com/article/550140.html)
## Suspense
1. 基本使用方式
```tsx
import { Suspense } from 'react'
<Suspense fallback={<Loading />}>
  <SomeComponent />
</Suspense>
```
2. 上面的代码表示`SomeComponent` 处于<font color=red>pending</font>状态，则展示<font color=red>fallback</font>
3. Suspense 怎么知道SomeComponent是处于Pending 状态呢？
4. <font color=red>Suspense 会去捕获自组件抛出来的异常，如果这个异常时Promise,而且Promise的状态时Pending状态则用fallback 内容，否则就渲染自组件内容 </font>
5. <font color=red>Suspense</font>处理异步请求的Pending状态， <font color=red>ErrorBoundary</font> 处理请求的<font color=red>Error</font>状态
6. <font color=red>React Streaming SSR 流程：</font>
> 1. 会先传输所有的<font color=red>Suspense</font> 以上层级的可以同步渲染得到的HTML结构
> 2. 当Suspense子组件渲染完成后，会将这部分组件对应的渲染结构，连同一个JS函数再传输到浏览器端
> 3. 这个JS函数会更新DOM，然后得到完整的HTML结构

## 源码解析

![](https://mmbiz.qpic.cn/mmbiz_png/lP9iauFI73z8Zc90nN3OWicTTaUFsQf84Lu0T4fWoZNdul2dmFWzl7KR6jDoM4z64aEfiaENrRH7TWJXsZib8jlkIQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)


#### useHydrate
配合Suspense进行水合。
```javascript
import useHydrate from '@/hooks/useHydrate'

const dataLoader = async (): Promise<{ content: string }> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        content: 'suspense will wait this ajax'
      })
    }, 1000)
  })
}


function SuspenseChild(): ReactElement {
  const [count, setCount] = useState(0)
  
  // if component re-render, data will not re-fetch
  const data = useHydrate(dataLoader).read()
  
  // if component re-render, data will re-fetch like this
  // const data = useHydrate(dataLoader, { flush: true }).read()

  return (
    <>
      <h1>Suspense Child Component：{count}</h1>
      <button onClick={setCount.bind(null, 2)}>Count++</button>
      <div>
        <p>{data?.content}</p>
      </div>
    </>
  )
}
```

import React, { useInsertionEffect } from 'react';
import './App.scss'
// https://juejin.cn/post/7118937685653192735?share_token=b06ac11f-deff-4304-b8d3-eff06d9a5302#heading-13
/**
 * useLayoutEffect
可以看到 useInsertionEffect 的执行时机要比 useLayoutEffect 提前，
useLayoutEffect 执行的时候 DOM 已经更新了，但是在 useInsertionEffect 的执行的时候，
DOM 还没有更新。本质上 useInsertionEffect 主要是解决 CSS-in-JS 在渲染中注入样式的性能问题。
这个 hooks 主要是应用于这个场景，在其他场景下 React 不期望用这个 hooks 。
 */

export default function App(){
 // useInsertionEffect 执行 -> useLayoutEffect 执行 -> useEffect 执行
  useInsertionEffect(()=>{
     /* 动态创建 style 标签插入到 head 中 */
     const style = document.createElement('style')
     style.innerHTML = `
       .css-in-js{
         color: red;
         font-size: 20px;
       }
     `
     document.head.appendChild(style)
  },[])

  return <div className="section css-in-js" data-title="14 useInsertionEffect"> hello , useInsertionEffect </div>
}


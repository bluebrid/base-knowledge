
import React, { useState } from 'react';
import './App.scss'
import Demo1 from './demo.1'
import Demo2 from './demo.2'
// https://www.jianshu.com/p/412c874c5add
/**
 * useLayoutEffect
这个是用在处理DOM的时候,当你的useEffect里面的操作需要处理DOM,
并且会改变页面的样式,就需要用这个,否则可能会出现出现闪屏问题, 
useLayoutEffect里面的callback函数会在DOM更新完成后立即执行,但是会在浏览器进行任何绘制之前运行完成,阻塞了浏览器的绘制.
 */

function App() {
  return (
    <div className="section" data-title="14 useLayoutEffect">
      <Demo1 />
      <Demo2 />
    </div>
  );
}

export default App;

/**
 * 但某些代码可能依赖于在状态更改后立即从 DOM 中读取某些内容。对于这些用例，您可以使用ReactDOM.flushSync()选择退出批处理：
 */
import React, {useEffect, useState} from 'react';
import { flushSync } from 'react-dom'; // Note: react-dom, not react
export default  function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    flushSync(() => {
      setCount(count + 1);
    });
    flushSync(() => {
      setCount(count + 1);
    });
    flushSync(() => {
      setCount(count + 1);
    });
    // React has updated the DOM by now
    flushSync(() => {
      // console.log(count)
      setFlag(f => !f);
    });
    // React has updated the DOM by now
  }
  
  useEffect(() => {
    console.log(count)
  }, [count])
  return (
    <div className="section" data-title="23 flushSync">
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
    </div>
  );
}
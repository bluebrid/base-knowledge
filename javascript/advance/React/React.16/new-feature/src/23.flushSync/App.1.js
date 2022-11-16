import React, {useState, useEffect} from 'react';
export default  function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setCount( count + 1);
    setCount( count + 1);
    setCount( count + 1);
    setFlag(f => !f);
    // 使用回调函数， 下一次会立即拿到最新的值，但是render 只会一次
    // setCount((count) => count + 1);
    // setCount((count) => count + 1);
    // setCount((count) => count + 1);
  }
  useEffect(() => {
    console.log(count)
  }, [count])
  return (
    <div className="section" data-title="23 no flushSync">
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? "blue" : "black" }}>{count}</h1>
    </div>
  );
}
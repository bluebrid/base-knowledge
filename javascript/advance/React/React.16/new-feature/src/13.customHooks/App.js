
import React, { useState } from 'react';

/**
 * 1. 自定义Hooks主要是通过已有的hooks 进行再次封装 
 * @param {*} num 
 */
function useNumCalc(num) {
  let [count, setCount] = useState(num);
  return [count, () => setCount(count + 1), () => setCount(count - 1)];
}

function App() {
  const [num, numPlus, numMinus] = useNumCalc(1);
  return (
    <div class="section" data-title="13 custom hooks">
      <div>num: {num}</div>
      <div>
        <button onClick={numPlus}>numPlus</button>
        <button onClick={numMinus}>numMinus</button>
      </div>
    </div>
  );
}

export default App;

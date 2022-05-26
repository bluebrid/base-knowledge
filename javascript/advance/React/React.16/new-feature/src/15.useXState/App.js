
import React, { useState } from 'react';
import './App.scss'
import setState from './useXState'
// https://www.jianshu.com/p/412c874c5add

function App() {
    const [state, setXState] = setState(1)
    return (
      <div className="section" data-title="15 useXState">
        <div>num: {state}</div>
        <div>
          <button onClick={setXState(state + 1)}>numPlus</button>
          <button onClick={setXState(state - 1)}>numMinus</button>
        </div>
      </div>
    );
}

export default App;

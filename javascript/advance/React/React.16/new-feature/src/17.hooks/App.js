
import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss'
// https://www.jianshu.com/p/412c874c5add
// React 怎么知道哪个state对应哪个`useState`，是根据Hook调用顺序来的
let hookStates = [];
let hookIndex = 0;
function useState(initState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initState
  let currentIndex = hookIndex;
  function setState(newState) {
    hookStates[currentIndex] = newState
    render()
  }
  return [hookStates[hookIndex++], setState]
}
function useEffect(callback, dependencies) {
  if (hookStates[hookIndex]) {
    let lastDeps = hookStates[hookIndex]
    let same = dependencies.every((item, index) => item === lastDeps[index]);
    if (same) {
      hookIndex++
    } else {
      hookStates[hookIndex++] = dependencies;
      setTimeout(callback)
    }
  } else {
    hookStates[hookIndex++] = dependencies;
    setTimeout(callback)
  }
}
function App() {
  const [name, setName] = useState('Mary')
  useEffect(function () {
    localStorage.setItem('formData', name)
  }, [name])
  const [surname, setSurname] = useState('Poppins')
  useEffect(function () {
    document.title = `${name}-${surname}`
  }, [name, surname])
  return (
    <div className="section" data-title="17 手写useState和useEffect">
      <div>{name}:{surname}</div>
      <div>
        <button onClick={() => {
          const randomVal = Math.floor(Math.random() * 10)
          setName('张' + randomVal)
        }}>姓</button>
        <button onClick={() => {
          const randomVal = Math.floor(Math.random() * 10)
          setSurname('三' + randomVal)
        }}>姓</button>
      </div>
    </div>
  );
}

function render() {
  hookIndex = 0 // 重置为0
  ReactDOM.render(<div>
    <App />
  </div>, document.getElementById('root'));
}

render()
export default App;

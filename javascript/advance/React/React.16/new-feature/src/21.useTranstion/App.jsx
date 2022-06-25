import "./App.css";
import DemoList from "./TransitionDemo/DemoList";
import InputDemo from './TransitionDemo/input'
function App() {
  return (
    <div className="section" data-title="21 useTranstion">
      <div className="App-content">
        <DemoList />
        <InputDemo/>
      </div>
    </div>
  );
}

export default App;

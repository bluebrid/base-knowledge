
import React, {useState} from 'react';
import Button1 from './demo.1';
import Button2 from './demo.2';

function App() {
  const [name, setName] = useState('名称');
  const [content, setContent] = useState('内容');
  return (
      <div className="section" data-title="12 hooks: useMemo">
        <button onClick={() => setName(new Date().getTime())}>name</button>
        <button onClick={() => setContent(new Date().getTime())}>content</button>
        <Button1 name={name}>{content}</Button1>
        <Button2 name={name}>{content}</Button2>
      </div>
  )
}

export default App;

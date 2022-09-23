import React, { useEffect, useState, useTransition, useDebugValue } from 'react';
import './App.scss';

const SearchResult = (props) => {
  const resultList = props.query
    ? Array.from({ length: 10000 }, (_, index) => ({
        id: index,
        keyword: `${props.query} -- 搜索结果${index}`,
      }))
    : [];
  return resultList.map(({ id, keyword }) => <li key={id}>{keyword}</li>);
};

function useFriendStatus() {
  const [type, setType] = useState(1);
  // useDebugValue 可用于在 React 开发者工具中显示**自定义 hook 的标签**。这个hooks目的就是检查自定义hooks。
  // ...
  // 在开发者工具中的这个 Hook 旁边显示标签
  // e.g. "FriendStatus: Online"
  useDebugValue(type === 1 ? 'normal' : 'transiton');

  return [type, setType];
}

export default function App() {
 
  const [type, setType] = useFriendStatus()

  const [value, setValue] = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [loading, startTransition] = useTransition({ timeoutMs: 2000 });

  useEffect(() => {
    // 监听搜索值改变
    console.log('对搜索值更新的响应++++++' + searchVal + '+++++++++++');
  }, [searchVal]);

  useEffect(() => {
    // 监听输入框值改变
    console.log('对输入框值更新的响应-----' + value + '-------------');
  }, [value]);

  useEffect(() => {
    if (type === 1) {
      setSearchVal(value);
    }
    if (type === 2) {
      startTransition(() => {
        setSearchVal(value);
      });
    }
  }, [value]);

  return (
    <div className="section " data-title="25 useTransition">
      <div className="useTransition">
        <input value={value} onChange={(e) => setValue(e.target.value)} />
        <div
          className={`type_button ${type === 1 ? 'type_button_checked' : ''}`}
          onClick={() => setType(1)}
        >
          normal
        </div>
        <div
          className={`type_button ${type === 2 ? 'type_button_checked' : ''}`}
          onClick={() => setType(2)}
        >
          transiton
        </div>
      </div>

      {loading && <p>数据加载中，请稍候...</p>}
      <ul>
        <SearchResult query={searchVal}></SearchResult>
      </ul>
    </div>
  );
}

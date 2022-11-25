/**
 * https://segmentfault.com/a/1190000042189201
 * useTransition 返回一个延迟响应的状态，可以设置最长延迟时间timeoutMs。如果给定的timeoutMs内未完成，它将会强制更新。
 * 与useDeferredValue的不同： useDeferredValue是处理一段逻辑，而useTransition是产生一个新状态。
 * useDeferredValue通过useEffect监听传入值的变化，然后通过过渡任务执行值的改变。
 * 这样保证defrredValue的更新滞后于setState，同时符合过渡更新的原则，因为是通过transition 调度机制执行的。
 */
import React, {useEffect, useState, useDeferredValue} from 'react';
const SearchResult = (props) => {
  const resultList = props.query
    ? Array.from({ length: 1000 }, (_, index) => ({
      id: index,
      keyword: `${props.query} -- 搜索结果${index}`,
    })) : [];
  return resultList.map(({ id, keyword }) => (
    <li key={id}>{keyword}</li>
  ))
}
export default function App() {
  const [value, setValue] = useState('');
  const searchValue = useDeferredValue(value);

  useEffect(() => {
    // 这里的值：没输入一次，都会执行
    console.log('对输入框值的响应--------' + value + '---------------')
  }, [value])

  useEffect(() => {
    // 监听搜索值改变： useDeferredValue 并不是立即响应
    console.log('对搜索值的更新响应+++++++' + searchValue + '+++++++++++')
  }, [searchValue])

  return (
    <div className="section" data-title="24 useDeferredValue">
      <h3>useDeferredValue</h3>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <div className='useDeferredValue'>useDeferredValue</div>
      <ul>
        <SearchResult query={searchValue}></SearchResult>
      </ul>
    </div>
  );
};
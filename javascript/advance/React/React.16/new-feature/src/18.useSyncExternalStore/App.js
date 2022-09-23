import { useMemo, useSyncExternalStore } from 'react';
/**
 * 推荐用于从外部数据源读取和订阅的场景，其方式与水化和时间切片等并发渲染功能兼容。
 * 该方法返回存储的值，并接受三个参数:
 * subscribe：注册一个回调的函数，每当store发生变化时就会调用。
 * getSnapshot：函数，返回store的当前值。
 * getServerSnapshot：返回服务器渲染时使用的快照的函数。
 * @returns 
 */
function useInnerWidth() {
  // 保持 subscribe 固定引用，避免 resize 监听器重复执行
  const [subscribe, getSnapshot] = useMemo(() => {
    return [
      notify => {
        // 真实情况这里会用到节流
        window.addEventListener('resize', notify);
        return () => {
          window.removeEventListener('resize', notify);
        };
      },
      // 返回 resize 后需要的快照
      () => window.innerWidth,
    ];
  }, []);
  return useSyncExternalStore(subscribe, getSnapshot);
}

function App() {
  const width = useInnerWidth();

  return <div className="section" data-title="18 useSyncExternalStore">
    <p>宽度: {width}</p>
  </div>;
}

export default App
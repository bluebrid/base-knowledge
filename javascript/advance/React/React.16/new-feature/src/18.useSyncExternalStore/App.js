import { useMemo, useSyncExternalStore } from 'react';

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
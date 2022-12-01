import React, { useState, useTransition, Suspense } from "react";
import { fetchMockData, MockItem } from "./utils";
import styles from "./DemoList.module.css";

// 默认加载第一页 mock 数据

function UserList({ resource }) {
  const mockList = resource.read();
  return (
    <div className={styles.list}>
      {mockList.map((item) => (
        <div key={item.id} className={styles.row}>
          <div className={styles.col}>{item.id}</div>
          <div className={styles.col}>{item.name}</div>
          <div className={styles.col}>{item.age} 岁</div>
        </div>
      ))}
    </div>
  );
}
/**
 * 
 * https://segmentfault.com/a/1190000042189201
 * useTransition 返回一个延迟响应的状态，可以设置最长延迟时间timeoutMs。如果给定的timeoutMs内未完成，它将会强制更新。
 * 与useDeferredValue的不同： useDeferredValue是处理一段逻辑，而useTransition是产生一个新状态。
 * useDeferredValue通过useEffect监听传入值的变化，然后通过过渡任务执行值的改变。
 * 这样保证defrredValue的更新滞后于setState，同时符合过渡更新的原则，因为是通过transition 调度机制执行的。
 */
function DemoList() {
  const [currentPag, setCurrentPage] = useState(1)
  const mockResource = fetchMockData(currentPag);
  const [resource, setResource] = useState(mockResource);
  const [isPending, startTransition] = useTransition();

  return (
    <Suspense fallback="加载中">
      <UserList resource={resource} />
      <button
        className={styles.button}
        type="button"
        onClick={() => {
          setCurrentPage(currentPag === 1 ? 2 : 1)
          // setResource(fetchMockData(currentPag))
          startTransition(() => {
            setResource(fetchMockData(currentPag))
          })
        }
        }
      >
        下一页
      </button>
      {isPending && <div className={styles.loading}>加载中</div>}
    </Suspense >
  );
}
export default DemoList
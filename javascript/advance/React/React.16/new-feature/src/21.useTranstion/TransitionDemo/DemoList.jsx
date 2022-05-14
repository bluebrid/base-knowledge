import React, { useState, useTransition, Suspense } from "react";
import { fetchMockData, MockItem } from "./utils";
import styles from "./DemoList.module.css";

// 默认加载第一页 mock 数据
const mockResource = fetchMockData(1);
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
function DemoList() {
  const [resource, setResource] = useState(mockResource);
  const [isPending, startTransition] = useTransition();

  return (
    <Suspense fallback="加载中">
      <UserList resource={resource} />
      <button
        className={styles.button}
        type="button"
        onClick={() =>
          startTransition(() => {
            setResource(fetchMockData(2));
          })
        }
      >
        下一页
      </button>
      {isPending && <div className={styles.loading}>加载中</div>}
    </Suspense>
  );
}
export default DemoList
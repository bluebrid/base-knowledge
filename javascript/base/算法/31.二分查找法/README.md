## 二分查找法
步骤：
1. 冲数组的**中间（（开始查找， 如果开始元素正好是目标值，则**搜索结束**
2. 如果目标值大于或者小于中间的元素，则在大于或者小于中间的元素继续搜索
```javascript
while (left <= right) {
  mid = (left + right) /2
  if (arr[mid === target])  return arr[mid]
  if (result > arr[mid]) {
    left = mid + 1
  }else {
    right = mid - 1;
  }
}
```
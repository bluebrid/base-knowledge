// 快速
const quickSort = (arr) => {
  if (arr.length === 1 || arr.length === 0) {
    return arr // 退出递归条件
  }
  let mid = arr[0] // 重点
  let left = [], right = [];
  for (let i = 1; i < arr.length; i++) { // i 是从1 开始，因为mid 是取0
    let num = arr[i]
    if (num > mid) {
      right.push(num)
    } else {
      left.push(num)
    }
  }
  return [...quickSort(left), mid, ...quickSort(right)]
}
// 插入
function insertSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    var temp = arr[i];
    var j = i;
    while (j > 0 && temp < arr[j - 1]) { // 如果前面的一个的值小于后面的值， 
      arr[j] = arr[j - 1];
      j--; // 这个是为了记录将temp 转移的索引
    }
    if (j != i) {
      arr[j] = temp;
    }
  }
  return arr;
}
// 选择
function selectionSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    var min = i;
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        // 记录现在能找到的最小元素的下标
        min = j;
      }
    }
    if (i != min) {
      var temp = arr[i];
      arr[i] = arr[min];// 将最小的值移动到第一位 
      arr[min] = temp;
    }
  }
  return arr
}

console.log(insertSort([1, 7, 2, 4, 5333, 3]));

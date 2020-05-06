/**
 * 1. 选择排序
 */

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

console.log(selectionSort([1, 7,2,4,5333,3]))

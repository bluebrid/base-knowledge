/**
 * 1. 插入排序
 */
function insertSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    var temp = arr[i];
    var j = i;
    while (j > 0 && temp < arr[j - 1]) { // 如果前面的一个的值小于后面的值， 
      arr[j] = arr[j - 1];
      j--;
    }
    if (j != i) {
      arr[j] = temp;
    }
  }
  return arr;
}

console.log(insertSort([1, 7, 2, 4, 5333, 3]));

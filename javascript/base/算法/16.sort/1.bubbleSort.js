/**
 * 1. 冒泡排序
 */

 function bubbleSort(arr) {

     for (var i = 1 ;i < arr.length; i ++) {
        var flag = true
        for (var j = 0; j < arr.length - i ; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                flag = false//表示本次进行了数据的交换
            }
        }
        if (flag) {
            break;
        }
     }
     return arr
 }

 console.log(bubbleSort([1, 7,2,4,5333,3]))
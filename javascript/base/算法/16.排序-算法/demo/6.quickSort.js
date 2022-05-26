const utils = require('./utils')
/**
 * 1. 将当前数组分区
 * 2. 分区时先选择一个基准值，再创建两个指针，左边一个指向数组第一个项，右边一个指向数组最后一个项。
 * 移动左指针直至找到一个比基准值大的元素，再移动右指针直至找到一个比基准值小的元素，然后交换它们，重复这个过程，
 * 直到左指针的位置超过了右指针。如此分区、交换使得比基准值小的元素都在基准值之前，比基准值大的元素都在基准值之后，这就是分区（partition）操作。
 * 3. 对于上一次分区后的两个区域重复进行分区、交换操作，直至分区到最小。
 */
function quickSort(arr, left, right) {
    var len = arr.length,
        partitionIndex,
        left = typeof left != "number" ? 0 : left,
        right = typeof right != "number" ? len - 1 : right;

    if (left < right) {
        partitionIndex = partition(arr, left, right);
        quickSort(arr, left, partitionIndex - 1);
        quickSort(arr, partitionIndex + 1, right);
    }
    return arr;
}

function partition(arr, left, right) {
    //分区操作
    var pivot = left, //设定基准值（pivot）
        index = pivot + 1;
    for (var i = index; i <= right; i++) {
        if (arr[i] < arr[pivot]) { // 最左边的是基准值， 判断是否小于基准值
            swap(arr, i, index);
            index++;
        }
    }
    swap(arr, pivot, index - 1);
    // console.log(arr)
    return index - 1;
}

function swap(arr, i, j) { // 只是交换值而已
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

if (!module.parent) {
    const numSize = 100000
    let arr = utils.generateArr(numSize)
    arr = [4, 5, 2, 1, 6]
    console.time('quickSort')
    quickSort(arr)
    console.timeEnd('quickSort')
}

module.exports = quickSort
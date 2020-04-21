const utils = require('./utils')

function binarySearch(arr, item) {
    // 调用排序算法先对数据进行排序
    let min = 0,
        max = arr.length - 1,
        mid,
        el
    while (min <= max) {
        mid = Math.floor((min + max) / 2)
        el = arr[mid]
        if (el < item) {
            min = mid + 1
        } else if (el > item) {
            max = mid - 1
        } else {
            return mid
        }
    }
    return -1
}

// 生成60个项的数组
const arr = utils.generateArr(10000000)
console.time('start')
console.log(binarySearch(arr, 50000))
console.timeEnd('start')
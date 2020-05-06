
/**
 * 插入排序 的思路是每次排一个数组项,假定第一项已经排序,接着它和第二项比较, 决定第二项的位置, 然后接着用同样的方式决定第三项的位置, 依次类推, 最终将整个数组从小到大依次排序.
 * 插入排序比选择排序快
 * @param {*} arr 
 */
module.exports = function insertionSort(arr) {
    let len = arr.length,
        j,
        temp;
        // console.log('Start:',arr.join(','))
    for (let i = 1; i < len; i++) {// 从第一个开始
        j = i
        temp = arr[i] // 保存排好序的最后一个值
        while (j > 0 && arr[j - 1] > temp) {
            arr[j] = arr[j - 1] // 前面的只往后面移动， 
            j--
        }
        arr[j] = temp; // 找到合适的位置的时候， 将j位置的值设置为arr[i]
        // console.log(arr.join(','))
    }
    return arr
}

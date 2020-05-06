/**
 * 选择排序的思路是找到数据结构中的最小值并将其放置在第一位,接着找到第二个最小值并将其放到第二位,依次类推.
 * @param {*} arr 
 */
module.exports =  function selectionSort(arr) {
    let len = arr.length,
        indexMin
        // console.log('Start:',arr.join(','))
    for (let i = 0; i < len - 1; i++) {
        indexMin = i
        for (let j = i; j < len; j++) { // 这一个循环，每次都找出最小的，并且保存其索引
            if (arr[indexMin] > arr[j]) {
                indexMin = j
            }
        } 
        if (i !== indexMin) { // 将最小的放在前面
            [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]]
        }
        // console.log(arr.join(','))
    }
    return arr
}
 

/**
 * 希尔排序
 * 核心：通过动态定义的 gap 来排序，先排序距离较远的元素，再逐渐递进
 * @param {*} arr 
 * 耗时：15ms
 */
module.exports = function shellSort(arr) {
    const len = arr.length;
    let gap = Math.floor(len / 2);

    while (gap > 0) {
        // gap距离
        // console.log(arr.join(','))
        for (let i = gap; i < len; i++) {
            const temp = arr[i];
            let preIndex = i - gap;

            while (arr[preIndex] > temp) {
                arr[preIndex + gap] = arr[preIndex];
                preIndex -= gap;
            }
            arr[preIndex + gap] = temp;
        }
        // console.log(arr.join(','))
        gap = Math.floor(gap / 2);
    }
    
    return arr;
}

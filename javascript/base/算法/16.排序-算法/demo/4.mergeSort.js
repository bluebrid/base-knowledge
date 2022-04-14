
/**
 * 归并排序是一种分治算法,其思想是将原始数组切分成较小的数组，直到每个小数组只有一个元素，接着将小数组归并成较大的数组，最后变成一个排序完成的大数组。
 * @param {*} arr 
 */
/**
 * 归并排序
 * @param {*} arr 
 * 耗时 30ms
 */
module.exports =  function concatSort(arr) {
    const len = arr.length;

    if (len < 2) { return arr; }

    const mid = Math.floor(len / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);

    return concat(concatSort(left), concatSort(right)); // 递归调用
}

function concat(left, right) {
    const result = [];
    // console.log(left, right);
    while (left.length > 0 && right.length > 0) { // 始终比较的是第一个数字，因为left right 都已经是排好序的
        result.push(left[0] <= right[0] ? left.shift() : right.shift());
    }

    const tempResult = result.concat(left, right);
    // console.log('tempResult:', tempResult)
    return tempResult
}

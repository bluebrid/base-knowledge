/**
 * arr1, arr2, 是一个递增序列， 而且都有可能存在重复的， 如果中一个元素一定在另外一个数组中， 则是其中的子集
 * @param {*} arr1 
 * @param {*} arr2 
 */
function func(arr1, arr2) {
    let len1 = new Set(arr1), len2 = new Set(arr2)
    let isArr1Max = len1.size >= len2.size
    let maxArr = isArr1Max ? arr1 : arr2
    let minArr = isArr1Max ? arr2 : arr1;
    let j = 0;
    for (let i = 0; i < maxArr.length; i++) {
        while (minArr[j] === maxArr[i]) {
            j++ // 移动窗口
        }
    }
    return j === minArr.length

}

const arr1 = [1, 2, 2, 4, 7, 8, 8, 15, 66, 66, 99]
const arr2 = [2, 2, 4, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 66]
console.log(func(arr1, arr2))
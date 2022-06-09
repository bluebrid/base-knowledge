/**
 * 合并两个有序数组
 * @param {*} arr1 
 * @param {*} arr2 
 */
const merge = (arr1, arr2) => {
    if (arr2.length > arr1.length) return merge(arr2, arr1)
    let res = []
    let index = 0;
    for (let i = 0; i < arr1.length; i++) {
        while (arr1[i] >= arr2[index] && index < arr2.length - 1) {
            res.push(arr2[index])
            index++
        }
        res.push(arr1[i])
    }
    return res
}

const arr1 = [1, 4, 6, 7, 99, 101], arr2 = [2, 4, 7, 9, 20, 33]
console.log(merge(arr1, arr2))
/**
 * 从数组里面找到两个数相加等于一个特定的值
 * @param {*} arr 
 */
const func1 = (arr, target) => {
    arr.sort((a, b) => a - b)

    for (let i = 0; i < arr.length; i++) {
        const temVal = target - arr[i]
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] === temVal) {
                return [arr[i], arr[j]]
            } else if (arr[j] > temVal) {
                break
            }
        }
    }
    return []
}
const arr = [-5, 2, -7, 1, 4, 8, 3], target = 7
console.log(func1(arr, target))
/**
 * 数组里找数字，前边所有的数都给它小，后边所有的数都比他大
 * @param {*} arr 
 */
const func2 = (arr) => {

    for (let i = 1; i < arr.length; i++) {
        const left = arr.slice(0, i)
        const right = arr.slice(i + 1)
        const leftRes = left.every(item => item < arr[i])
        const rightRes = right.every(item => item > arr[i])
        if (leftRes && rightRes) {
            return arr[i]
        }
    }
}
const arr1 = [1, 6, 4, 8, 33, 44, 11, 55, 12]
console.log(func2(arr1))
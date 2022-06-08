/**
 * 给一个数组，不用数组原型提供的操作方法，
 * 将数组中所有的0移到数组末尾，其它部分相对位置保持不变
 * @param {*} arr 
 */
function moveZeros(arr) {
    let lastZoneIndex = -1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0 && lastZoneIndex < 0) {
            lastZoneIndex = i;
        } else {
            if (arr[i] !== 0) {
                arr[lastZoneIndex] = arr[i]
                arr[i] = 0
                while (arr[lastZoneIndex++] === 0) {
                    lastZoneIndex++
                }
            }
        }

    }
    return arr
}
const arr = [0, 1, 2, 0, 0, 5, 8, 0, 9]
console.log(moveZeros(arr))
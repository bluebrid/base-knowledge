const inner = (arr1, arr2) => {
    // 默认是排序的
    if (arr2.length > arr1.length) return inner(arr2, arr1)
    let res = []
    let index = 0;
    for (let i = 0; i < arr1.length; i++) {
        while(arr2[index] <= arr1[i] && index < arr2.length) {
            if (arr2[index] === arr1[i]) {
                res.push(arr1[i])
            }
            index++
        }
    }
    return res
}
let arr1 = [1, 4, 6, 8, 11, 26, 27, 30], arr2 = [1, 2, 4, 8, 9, 13, 26]
console.log(inner(arr1, arr2))
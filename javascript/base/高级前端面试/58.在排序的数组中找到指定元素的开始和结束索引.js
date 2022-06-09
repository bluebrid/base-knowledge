const findIndex= (arr, target) => {
    let res = [-1, -1]
    for(let i=0;i<arr.length;i++) {
        if (arr[i] === target) {
            res[0] = i
            while(arr[i+1] === target) {
                i++
            }
            res[1] =i
            return res
        }
    }
    return res
}
const arr = [5, 7,7, 8,8,8,8, 9,10,11,11], target = 81
console.log(findIndex(arr, target)) 
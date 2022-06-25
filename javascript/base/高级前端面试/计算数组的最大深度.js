const arr = [1,[2,[3,[4,[5,6]]]]]
const maxDep = (arr, len ) => {
    if (arr.length < 1) return 1
    let res = []
    len++
    for(let i=0;i<arr.length;i++) {
        if (Array.isArray(arr[i])) {
            res.push(maxDep(arr[i]))
        } else {
            res.push(len)
        }
        
    }
    return Math.max(...res)
}
console.log(maxDep(arr,0))
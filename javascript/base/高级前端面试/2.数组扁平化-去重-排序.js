const flat = (arr) => {
    const res = new Set();
    const helper = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                helper(arr[i])
            } else {
                res.add(arr[i])
            }
        }
    }
    helper(arr)
    return Array.from(res).sort((a, b) => a - b)
}

const arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
console.log(flat(arr))
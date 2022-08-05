const func = (arr) => {
    const res = []
    const len = arr.length - 1;
    let index = 0;
    let lastIndex = 0
    while (index <= len) {
        while (arr[index] + 1 === arr[index + 1]) index++
        if (lastIndex !== index) {
            res.push(`${arr[lastIndex]}~${arr[index]}`)
        } else {
            res.push(arr[index])
        }
        index++
        lastIndex = index
    }

    return res;
}
const arr = [1, 2, 3, 5, 7, 8, 10]
console.log(func(arr))
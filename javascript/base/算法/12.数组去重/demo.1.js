function merge1(arr) {
    const temVal = ',' + arr.join(',')
    console.log(temVal)
    return temVal.replace(/(,\d{1,})\1+/g, '$1').split(',').map(e => +e)
}
const merge = (arr) => {
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        while (arr[i] === arr[i + 1]) i++
        res.push(arr[i])
    }
    return res
}
console.log(merge([3, 3, 3, 22, 2, 2, 4, 5, 5, 6, 2, 1]))

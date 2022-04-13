function merge(arr) {
    const temVal = ','+ arr.join(',')
    console.log(temVal)
    return temVal.replace(/(,\d{1,})\1+/g, '$1').split(',').map(e => +e)
}
console.log(merge([3,3,3,22,2,2,4,5,5,6,2,1]))
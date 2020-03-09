function merge(arr) {
    return arr.join(',').replace(/(\d,)\1+/g, '$1').split(',').map(e => +e)
}
console.log(merge([3,2,2,2,4,5,5,6,2,1]))
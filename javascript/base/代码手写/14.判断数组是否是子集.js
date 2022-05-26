function isChildren(a, b) {
    const strA = ',' + a.join(',') + ','
    let strB = ',' + b.join(',') + ','
    return strB.includes(strA)
}

const a = [4, 5, 6, 7]
const b = [1, 2, 3, 4, 5, 6]

console.log(isChildren(a, b))
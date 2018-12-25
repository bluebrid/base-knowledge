/**
 * 二. 实现超出整数存储范围的两个大整数相加function add(a,b)。注意a和b以及函数的返回值都是字符串。
 */
console.log(add('123', '12345'))
function add(a, b) {
    let aLen = a.length
    let bLen = b.length
    let maxLen = aLen > bLen ? aLen : bLen
    let newA = a
    let newB = b
    if (maxLen > aLen) {
        newA = '0'.repeat(maxLen - aLen) + a
    }
    if (maxLen > bLen) {
        newB = '0'.repeat(maxLen - bLen) + b
    }
    let result = ''
    let isTen = false
    for (let i = maxLen - 1; i >= 0; i--) {
        let tempResutl = (+newA[i]) + (+newB[i])
        if (isTen) {
            tempResutl++
        }
        if (tempResutl > 9) {
            result = (+tempResutl.toString()[1]) + result
            isTen = true
        } else {
            result = tempResutl + result
            isTen = false
        }
    }
    return result
    //  return result.split('').reverse()

}



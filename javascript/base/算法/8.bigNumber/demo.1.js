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


console.log(bigMut("567", "1234")); // 699678 
function bigMut(big, common) {
    big += "";
    common += "";
    if (big.length < common.length) {
        big = [common, common = big][0];
    }
    big = big.split("").reverse();
    var oneMutManyRes = [];
    var i = 0,
        len = big.length;
    for (; i < len; i++) {
        oneMutManyRes[oneMutManyRes.length] = oneMutMany(big[i], common) + getLenZero(i);
    }
    var result = oneMutManyRes[0];
    for (i = 1, len = oneMutManyRes.length; i < len; i++) {
        result = bigNumAdd(result, oneMutManyRes[i]);
    }
    return result;
}
function getLenZero(len) {
    len += 1;
    var ary = [];
    ary.length = len;
    return ary.join("0");
}
function oneMutMany(one, many) {
    one += "";
    many += "";
    if (one.length != 1) {
        one = [many, many = one][0];
    }
    one = parseInt(one, 10);
    var i = 0,
        len = many.length,
        resAry = [],
        addTo = 0,
        curItem,
        curRes,
        toSave;
    many = many.split("").reverse();
    for (; i <= len; i++) {
        curItem = parseInt(many[i] || 0, 10);
        curRes = curItem * one + addTo;
        toSave = curRes % 10;
        addTo = (curRes - curRes % 10) / 10;
        resAry.unshift(toSave);
    }
    if (resAry[0] == 0) {
        resAry.splice(0, 1);
    }
    return resAry.join("");
}
function bigNumAdd(big, common) {
    big += "";
    common += "";
    var maxLen = Math.max(big.length, common.length),
        bAry = big.split("").reverse(),
        cAry = common.split("").reverse(),
        i = 0,
        addToNext = 0,
        resAry = [],
        fn,
        sn,
        sum;
    for (; i <= maxLen; i++) {
        fn = parseInt(bAry[i] || 0);
        sn = parseInt(cAry[i] || 0);
        sum = fn + sn + addToNext;
        addToNext = (sum - sum % 10) / 10;
        resAry.unshift(sum % 10);
    }
    if (resAry[0] == 0) {
        resAry.splice(0, 1);
    }
    return resAry.join("");
}

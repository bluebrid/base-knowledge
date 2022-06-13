const bigAdd = (str1, str2) => {
    const len1 = str1.length;
    const len2 = str2.length;
    if (len1 < len2) return bigAdd(str2, str1)
    let index = 0;
    let isGenTem = false
    let result = ''
    while (index < len1) {
        const s1 = str1.charAt(len1 - index - 1)
        const s2Index = len2 - index - 1
        const s2 = s2Index < 0 ? '0' : str2.charAt(len2 - index - 1)
        const res = +s1 + +s2 + (isGenTem ? 1 : 0)
        isGenTem = false
        if (res >= 10) {
            isGenTem = true
            result = (res - 10) + result
        } else {
            result = res + result
        }
        index++

    }
    return result
}
const str1 = '12345679', str2 = '2222';
console.log(bigAdd(str1, str2))
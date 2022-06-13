// 只是查看最长公共前缀
let longestCommonPrefix = (arrs) => {
    let res = ''
    let charLen = arrs[0].length
    for (let i = 0; i < charLen; i++) {
        const s = arrs[0].charAt(i)
        for (let j = 1; j < arrs.length; j++) {
            if (arrs[j].charAt(i) != s) {
                return res
            }
        }
        res = res + s
    }
    
    return res
}

const arrs = ['flower', 'flow', 'flight']
console.log(longestCommonPrefix(arrs))
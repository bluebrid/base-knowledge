/**
 * 给你一个字符串 s，找到 s 中最长的回文子串。
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    let res = ''
    for (let i = 0; i < s.length; i++) {
        const s1 = midSpand(s, i, i)
        const s2 = midSpand(s, i, i + 1)
        res = res.length <= s1.length ? s1 : res
        res = res.length <= s2.length ? s2 : res
    }
    return res;
};
var midSpand = (s, l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
        r++;
        l--
    }
    return s.slice(l + 1, r)
}
console.log(longestPalindrome("babad"))
/**
 * 给定一个非空字符串 s，最多删除一个字符。判断是否能成为回文字符串。
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
    let l = 0, r = s.length - 1;
    let count = 0;
    while (l != r && l <= r) {
        if (s[l] != s[r]) {
            r--
            count++
        } else {
            l++;
            r--
        }
    }
    if (count > 1) {
        count = 0
        l = 0, r = s.length - 1;
        while (l != r && l <= r) {
            if (s[l] != s[r]) {
                l++
                count++
            } else {
                l++;
                r--
            }
        }
    }

    return count <= 1
};
const s = "absca", s1 = "bddb", s2 = "deeee", s3 = 'abc'
// console.log(validPalindrome(s))
// console.log(validPalindrome(s1))
// console.log(validPalindrome(s2))
console.log(validPalindrome(s3))
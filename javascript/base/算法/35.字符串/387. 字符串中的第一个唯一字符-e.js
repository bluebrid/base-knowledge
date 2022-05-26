/**
 * 给定一个字符串 s ，找到 它的第一个不重复的字符，并返回它的索引 。如果不存在，则返回 -1 。
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
    let result = -1
    let remove = ''
    while (s.length) {
        let t = s[0]
        s = s.slice(1)
        result++
        if (!s.includes(t) && !remove.includes(t)) {
            return result
        }
        remove = remove + t
    }

    return -1
};
const s = "leetcode" // 0 也就是l
const s1 = '1aabb'
// console.log(firstUniqChar(s))
console.log(firstUniqChar(s1))
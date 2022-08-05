/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let set = [];
    let maxLen = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s.charAt(i)
        const index = set.indexOf(c)
        if (index > -1) {
            set.splice(0, index + 1)
        }
        set.push(c)
        maxLen = Math.max(maxLen, set.length)
    }
    return maxLen
};

const s = "pwwkew";
console.log(lengthOfLongestSubstring(s))
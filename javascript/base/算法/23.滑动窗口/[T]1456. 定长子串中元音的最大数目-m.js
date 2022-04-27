/**
 * 给你字符串 s 和整数 k 。
 * 请返回字符串 s 中长度为 k 的单个子字符串中可能包含的最大元音字母数。
 * 英文中的 元音字母 为（a, e, i, o, u）。
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function (s, k) {
  const vowels = new Set(['a', 'e', 'i', 'o', 'u'])
  let count = 0,
    l = 0,
    r = 0
  while (r < k) {//初始化大小k的窗口
    vowels.has(s[r]) && count++
    r++
  }
  let max = count
  while (r < s.length) {//不断移动窗口
    vowels.has(s[r]) && count++
    vowels.has(s[l]) && count--
    l++
    r++
    max = Math.max(max, count)//更新最大元音数
  }
  return max
};
let s = 'leetcode', k = 3
console.log(maxVowels(s, k))
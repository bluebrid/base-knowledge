/**
 * 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (/^\s+$/.test(s)) return 1
  let map = []
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i)
    const index = map.indexOf(c)
    if (index >=0) { // 已经存在
      res = Math.max(map.length, res)
      // 需要将Index之前的删除
      map.splice(0, index+1)
      map.push(c)
      // while (map.get(c)) { // 这里应该将之前的删除吧？
      //   map.delete(c)
      // }
      // map.clear()
      // map.set(c, c)
    } else { // 不存在
      map.push(c)
      res = Math.max(map.length, res)

    }
  }
  return res
};
const s = "pwwkew"
console.log(lengthOfLongestSubstring(s))
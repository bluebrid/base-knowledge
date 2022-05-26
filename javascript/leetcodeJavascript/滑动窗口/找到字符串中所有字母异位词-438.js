/**
 * https://leetcode-cn.com/problems/find-all-anagrams-in-a-string/
 * 给定两个字符串 s 和 p，找到 s 中所有 p 的 异位词 的子串，返回这些子串的起始索引。
 * 不考虑答案输出的顺序。
异位词 指由相同字母重排列形成的字符串（包括相同的字符串）。
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
let findAnagrams = function (s, p) {
  let targetMap = makeCountMap(p)
  let sl = s.length
  let pl = p.length
  // [left,...right] 滑动窗口
  let left = 0
  let right = pl - 1
  let windowMap = makeCountMap(s.substring(left, right + 1))
  let res = []

  while (left <= sl - pl && right < sl) {
    if (isAnagrams(windowMap, targetMap)) {
      res.push(left)
    }
    windowMap[s[left]]--
    right++
    left++
    addCountToMap(windowMap, s[right])
  }

  return res
}

let isAnagrams = function (windowMap, targetMap) {
  let targetKeys = Object.keys(targetMap)
  for (let targetKey of targetKeys) {
    if (
      !windowMap[targetKey] ||
      windowMap[targetKey] !== targetMap[targetKey]
    ) {
      return false
    }
  }
  return true
}

function addCountToMap(map, str) {
  if (!map[str]) {
    map[str] = 1
  } else {
    map[str]++
  }
}

function makeCountMap(strs) {
  let map = {}
  for (let i = 0; i < strs.length; i++) {
    let letter = strs[i]
    addCountToMap(map, letter)
  }
  return map
}

console.log(findAnagrams("abab", "ab"))

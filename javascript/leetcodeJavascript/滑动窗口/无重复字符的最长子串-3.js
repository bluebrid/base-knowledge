/**
 * 思路：滑动窗口不断向前，当前元素不在set中 就加入set 然后更新最大长度，i++继续下一轮循环，set中有重复元素不断让j++ 并删除窗口之外的元素 直到滑动窗口内没有重复的元素
 * 复杂度：时间复杂度O(n)，n是字符串的长度。空间复杂度是O(n)，即set的空间，最差的情况是O(n)
 * @param {string} s
 * @return {number}
 */
let lengthOfLongestSubstring = function (str) {
  let n = str.length
  // 滑动窗口为s[left...right]
  let left = 0
  let right = -1
  let freqMap = {} // 记录当前子串中下标对应的出现频率
  let max = 0 // 找到的满足条件子串的最长长度

  while (left < n) {
    let nextLetter = str[right + 1]
    if (!freqMap[nextLetter] && nextLetter !== undefined) {
      freqMap[nextLetter] = 1
      right++
    } else {
      freqMap[str[left]] = 0
      left++
    }
    max = Math.max(max, right - left + 1)
  }

  return max
}

const lengthOfLongestSubstring1 = function (s) {
  const set = new Set(); //判断滑动窗口内是否有重复元素
  let i = 0,//滑动窗口右边界
      j = 0,//滑动窗口左边界
      maxLength = 0;
  if (s.length === 0) {//极端情况
      return 0;
  }
  for (i; i < s.length; i++) {
      if (!set.has(s[i])) {//当前元素不在set中 就加入set 然后更新最大长度，i++继续下一轮循环
          set.add(s[i]);
          maxLength = Math.max(maxLength, set.size);
      } else {
          //set中有重复元素不断让j++ 并删除窗口之外的元素 直到滑动窗口内没有重复的元素
          while (set.has(s[i])) {
              set.delete(s[j]);
              j++;
          }
          set.add(s[i]);//放心将s[i]加入set中
      }
  }
  return maxLength;
};
// console.log(lengthOfLongestSubstring1("pwwkew"))
console.log(lengthOfLongestSubstring1("dvdf"))
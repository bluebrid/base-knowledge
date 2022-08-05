<<<<<<< HEAD

/**
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
 * 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let need = {};//需要覆盖的字符串频数
  let window = {};//滑动窗口的字符串频数
  for (let a of t) {
    need[a] = (need[a] || 0) + 1;//统计t中字符频数
  }
  //左右指针
  let left = 0,
    right = 0;
  let valid = 0;//滑动窗口中能覆盖的字符种类数
  let start = 0,//最小覆盖子串的起始索
    len = Number.MAX_VALUE;//最小覆盖子串长度
  while (right < s.length) {
    let c = s[right];//进入滑动窗口右边的字符
    right++;//右移窗口
    if (need[c]) {//如果当前字符在need字符中 更新window中字符数
      window[c] = (window[c] || 0) + 1;
      if (window[c] == need[c]) {//如果当前窗口和需要的字符数量一致时，字符种类+1
        valid++;
      }
    }

    while (valid == Object.keys(need).length) {//字符种类与需要的字符个数一致时，就收缩窗口
      if (right - left < len) {//当前窗口长度小于之前窗口的长度len 更新最小覆盖子串的起始位置和长度
        start = left;
        len = right - left;
      }
      let d = s[left];//需要被移除的字符
      left++;//左移窗口 从窗口中移除字符
      if (need[d]) {//如果在需要的字符中 更新window中字符数
        if (window[d] == need[d]) {//如果当前窗口和需要的字符数量一致时，字符种类-1
          valid--;
        }
        window[d]--;
      }
    }
  }
  //没有找到覆盖子串 返回'' 否则返回覆盖子串
  return len == Number.MAX_VALUE ? "" : s.substr(start, len);
};
const s = "ADOBECODEBANC", t = "ABC";
=======

/**
 * 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
 * 如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 "" 。
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let need = {};//需要覆盖的字符串频数
  let window = {};//滑动窗口的字符串频数
  for (let a of t) {
    need[a] = (need[a] || 0) + 1;//统计t中字符频数
  }
  //左右指针
  let left = 0,
    right = 0;
  let valid = 0;//滑动窗口中能覆盖的字符种类数
  let start = 0,//最小覆盖子串的起始索
    len = Number.MAX_VALUE;//最小覆盖子串长度
  while (right < s.length) {
    let c = s[right];//进入滑动窗口右边的字符
    right++;//右移窗口
    if (need[c]) {//如果当前字符在need字符中 更新window中字符数
      window[c] = (window[c] || 0) + 1;
      if (window[c] == need[c]) {//如果当前窗口和需要的字符数量一致时，字符种类+1
        valid++;
      }
    }

    while (valid == Object.keys(need).length) {//字符种类与需要的字符个数一致时，就收缩窗口
      if (right - left < len) {//当前窗口长度小于之前窗口的长度len 更新最小覆盖子串的起始位置和长度
        start = left;
        len = right - left;
      }
      let d = s[left];//需要被移除的字符
      left++;//左移窗口 从窗口中移除字符
      if (need[d]) {//如果在需要的字符中 更新window中字符数
        if (window[d] == need[d]) {//如果当前窗口和需要的字符数量一致时，字符种类-1
          valid--;
        }
        window[d]--;
      }
    }
  }
  //没有找到覆盖子串 返回'' 否则返回覆盖子串
  return len == Number.MAX_VALUE ? "" : s.substr(start, len);
};
const s = "ADOBECODEBANC", t = "ABC";
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(minWindow(s, t))
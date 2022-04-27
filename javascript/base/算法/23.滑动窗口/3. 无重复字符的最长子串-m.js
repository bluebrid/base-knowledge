var lengthOfLongestSubstring = function (s) {
  const set = new Set(); //判断滑动窗口内是否有重复元素
  let maxLength = 0;
  if (s.length === 0) {//极端情况
    return 0;
  }
  let j = 0; // 记录窗口外的位置
  for (let i = 0; i < s.length; i++) {
    if (!set.has(s[i])) {//当前元素不在set中 就加入set 然后更新最大长度，i++继续下一轮循环
      set.add(s[i]);
      maxLength = Math.max(maxLength, set.size);
    } else {
      // 其实只会存在第一个元素会被移除
      while (set.has(s[i])) {
        set.delete(s[j]);
        j++; // 窗口往里面移动一个
      }
      set.add(s[i]);//放心将s[i]加入set中
    }
  }
  return maxLength;
};

var strOfLongestSubstring = function (s) {
  const set = new Set(); //判断滑动窗口内是否有重复元素
  let maxLength = 0;
  if (s.length === 0) {//极端情况
    return 0;
  }
  let j = 0;
  for (let i = 0; i < s.length; i++) {
    if (!set.has(s[i])) {//当前元素不在set中 就加入set 然后更新最大长度，i++继续下一轮循环
      set.add(s[i]);
      maxLength = Math.max(maxLength, set.size);
    } else {
      // 其实只会存在第一个元素会被移除
      while (set.has(s[i])) {
        set.delete(s[j]);
        j++;
      }
      set.add(s[i]);//放心将s[i]加入set中
    }
  }
  return maxLength;
};


console.log(lengthOfLongestSubstring('adds.cgomsddd'))
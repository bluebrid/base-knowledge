var longestPalindrome = function(s) {
    let n = s.length;
    let res = '';
    let dp = Array.from(new Array(n),() => new Array(n).fill(false));//初始化数组 
    for(let i = n-1;i >= 0;i--){//循环字符串
        for(let j = i;j < n;j++){
          //dp[i][j]表示子串i～j是否是回文子串
          //回文子串必须满足s[i]，s[j]相等。并且向外扩展一个字符也相等，即dp[i+1][j-1]也是回文子串
          //j - i < 2表示子串小于等于1也是回文串
            dp[i][j] = s[i] == s[j] && (j - i < 2 || dp[i+1][j-1]);
            if(dp[i][j] && j - i +1 > res.length){//当前回文子串比之前的大，更新最大长度
                res = s.substring(i,j+1);
            }
        }
    }
    return res;
};

// 回文串正着读反着读都一样，遍历每个字符，从中心往两端扩散，找到最长回文串。
var longestPalindrome1 = function (s) {
    let res = ""
    for (let i = 0; i < s.length; i++) {
        // 处理奇数回文串
        const s1 = palindrome(s, i, i)
        // 处理偶数回文串（应该叫下一个字符串，是否页是满足回文的意思）
        const s2 = palindrome(s, i, i + 1)
        res = res.length <= s1.length ? s1 : res
        res = res.length <= s2.length ? s2 : res
    }
    return res
};

// 返回以l,r为中心点扩散的最长回文串
function palindrome(s, l, r) {
    while (l >= 0 && r < s.length && s[l] === s[r]) { //这个就是阻断循环的条件
        // 左右指针
        l--
        r++
    }
    return s.slice(l + 1, r)
}


console.log(longestPalindrome("babad"))
console.log(longestPalindrome1("babad"))

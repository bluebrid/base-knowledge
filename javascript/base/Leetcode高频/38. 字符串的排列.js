/**
 * 输入一个字符串，打印出该字符串中字符的所有排列。

 * @return {string[]}
 */
 var permutation = function(s) {
    if (s.length === 0) return [''];
    if (s.length === 1) return [s];
    const res = [];
    const len = s.length;
    for (let i = 0; i < len; i++) {
        const char = s[i];
        // newStr = 去掉char后剩下的字符
        let newStr = s.slice(0, i) + s.slice(i + 1);
        // 递归产生newStr的全排列
        const next = permutation(newStr);
        // 将char与newStr的全排列拼接，放入res
        next.forEach(item => {
            res.push(char + item);
        });
    }
    // 去重
    return [...new Set(res)];
};
const s = "abc"
console.log(permutation(s))
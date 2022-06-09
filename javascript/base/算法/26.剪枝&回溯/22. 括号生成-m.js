/**
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis1 = (n) => {
    const res = []; // 输出的结果数组
    const generate = (str, left, right) => {
        if (str.length == 2 * n) { // 字符串构建完成
            res.push(str);           // 将字符串加入res
            return;                  // 结束当前递归（结束当前搜索分支）
        }
        if (left > 0) {            // 只要左括号有剩，可以选它，继续递归做选择
            generate(str + '(', left - 1, right);
        }
        if (right > left) {        // 右括号的保有数量大于左括号的保有数量，才能选右括号
            generate(str + ')', left, right - 1);
        }
    };

    generate('', n, n); // 递归的入口，初始字符串是空字符串，初始括号数量都是n
    return res;
};

//思路：当左括号剩下的多，说明字符串中的左括号数量少于右括号，不合法，对字符串尝试添加左括号，然后回溯，尝试添加右括号，然后尝试回溯
var generateParenthesis = function(n) {
    if (n == 0) return []
    const res = []
    let track = []
    backtrack(n, n, track, res)
    return res
    function backtrack(left, right, track, res) {
        // 数量小于0，不合法
        if (left < 0 || right < 0) return
        // 若左括号剩下的多，说明不合法
        if (right < left) return
        // 所有括号用完，得到合法组合
        if (left == 0 && right == 0) {
            res.push(track.join(''))
            return
        }

        // 尝试添加左括号 
        track.push('(')
      	//这个地方一定要注意 需要拷贝一份track，也就是采用[...track]， 不然会影响其他分支
        backtrack(left - 1, right, [...track], res)
        track.pop()

        // 尝试添加右括号
        track.push(')')
        backtrack(left, right - 1, [...track], res)
        track.pop()
    }
};

console.log(generateParenthesis(3))
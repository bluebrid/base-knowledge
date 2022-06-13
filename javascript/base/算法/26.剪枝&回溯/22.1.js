const generateParenthesis = (n) => {
    const res = []; // 输出的结果数组
    const helper = (str, left, right) => {
        if (str.length === 2 * n) {
            res.push(str)
            return
        }
        if (left > 0) {
            helper(str + '(', left - 1, right)
        }
        if (right > left) {// 右括号的保有数量大于左括号的保有数量，才能选右括号
            helper(str + ')', left, right - 1)
        }
    }
    helper('', n, n)
    return res;
};

const generateParenthesis1 = (n) => {
    if (n == 0) return []
    let res = [];
    let track = [];
    const helper = (left, right, track, res) => {
        if (left === 0 && right === 0) {
            res.push(track.join(''))
            return
        }
        if (left < 0 || right < 0) return;
        if (right < left) return
        // 尝试添加左边括号
        track.push('(')
        helper(left - 1, right, [...track], res)
        track.pop();
        // 尝试添加右边括号
        track.push(')')
        helper(left, right - 1, [...track], res)
        track.pop()

    }
    helper(n, n, track, res)
    return res
}
console.log(generateParenthesis(3))
console.log(generateParenthesis1(3))

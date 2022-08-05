/**
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    if (!digits) return []
    const map = {//建立电话号码和字母的映射关系
        2: "abc",
        3: "def",
        4: "ghi",
        5: "jkl",
        6: "mno",
        7: "pqrs",
        8: "tuv",
        9: "wxyz",
    };
    const res = []
    const helper = (index, curStr) => {
        if (index > digits.length - 1) {
            res.push(curStr)
            return;
        }
        const letters = map[digits[index]]; //取出数字对应的字母
        for (const l of letters) {
            //进入不同字母的分支
            helper(index + 1, curStr + l); //参数传入新的字符串，i右移，继续递归
        }
    }
    helper(0, '')
    return res;
};
// BFS
var letterCombinations1 = (digits) => {
    if (digits.length == 0) return [];
    const map = {
        2: "abc",
        3: "def",
        4: "ghi",
        5: "jkl",
        6: "mno",
        7: "pqrs",
        8: "tuv",
        9: "wxyz",
    };

    const queue = [];
    queue.push("");
    for (let i = 0; i < digits.length; i++) {//循环数字的每个字符
        const levelSize = queue.length; //当前层的节点个数
        for (let j = 0; j < levelSize; j++) {
            const curStr = queue.shift(); //当前层的字符串
            const letters = map[digits[i]];//获取数字对应的字母字符
            for (const l of letters) {
                queue.push(curStr + l); //新生成的字符串入列
            }
        }
    }
    return queue; //最后一层生成的字符串就是解
};
const digits = "23"
console.log(letterCombinations(digits))
console.log(letterCombinations1(digits))
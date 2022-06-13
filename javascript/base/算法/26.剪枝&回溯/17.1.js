var letterCombinations = (digits) => {
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
    let queue = ['']
    for (let i = 0; i < digits.length; i++) {
        const levelSize = queue.length;
        for (let j = 0; j < levelSize; j++) {
            const numchars = map[digits[i]]
            const currStr = queue.shift()// 取出第一个
            for (let c of numchars) {
                queue.push(currStr + c)
            }
        }

    }
    return queue
};
const digits = "23"
console.log(letterCombinations(digits))
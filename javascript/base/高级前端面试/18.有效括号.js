let func =(str) => {
    const map = new Map([
        [')', '('],
        [']', '['],
        ['}', '{']
    ])
    const stack = [];
    for(let s of str) {
        if (map.has(s)) {
            const pre = stack.pop();
            if (map.get(s) !== pre) {
                return false
            }
        } else {
            stack.push(s)
        }
    }
    return stack.length === 0
}
const str = "((())){}[]"
console.log(func(str))
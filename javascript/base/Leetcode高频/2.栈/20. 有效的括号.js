var isValid = function(s) {
    const map = new Map([
        [')', '('],
        [']', '['],
        ["}","{"]
    ])
    let res = [];
    for(let i=0;i< s.length;i++) {
        const temp = s[i]
        if (map.has(temp)) {
            if (res[res.length -1] !== map.get(temp)) {
                return false
            } else {
                res.pop()
            }
        } else {
            res.push(temp)
        }
    }
    return res.length === 0
}

const s = "()[]{}"
const s1 = "([{[}])"
console.log(isValid(s1))
const maxSub = (str) => {
    let set = new Set()
    let max = 0
    for(let s of str) {
        if (!set.has(s)) {
            set.add(s)
        } else {
            while(set.has(s)) {
                set.delete(s)
            }
            set.add(s)
        }
        max = Math.max(set.size, max)
    }
    return max 
}

const str = "abcdabcbb"
console.log(maxSub(str))
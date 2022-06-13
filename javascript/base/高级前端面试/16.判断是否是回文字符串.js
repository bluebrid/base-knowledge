const func = (str) => {
    let left = 0,right = str.length-1;
    while(left <= right) {
        const l = str.charAt(left)
        const r = str.charAt(right) 
        if (l !== r) {
            return false
        }
        left ++
        right --
    }
    return true
}
const s = 'abddcba'
console.log(func(s))
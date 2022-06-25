const func = (start, end) => {
    let res = []
    const helper = (num) => {
        let numStr = num.toString()
        let left = 0,right = numStr.toString().length -1
        while(left <= right) {
            if(numStr.charAt(left) !== numStr.charAt(right)) {
                return false
            }
            left ++
            right --
        }
        return true
    }
    for(let i = start;i<=end; i++) {
        if (helper(i)) {
            res.push(i)
        }
    }
    return res
}

console.log(JSON.stringify(func(1, 10000)))
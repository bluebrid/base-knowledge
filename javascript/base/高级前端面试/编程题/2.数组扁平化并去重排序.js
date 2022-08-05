const func = (arrs) => {
    let res = new Set()
    const helper = (arrs) => {
        for (let i = 0; i < arrs.length; i++) {
            if (Array.isArray(arrs[i])) {
                helper(arrs[i])
            } else {
                res.add(arrs[i])
            }
        }
    }
    helper(arrs)

    return [...res].sort((a, b) => a - b);
}

const arrs = [[1, 2, 2, 22], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, 12, 13]], 10]
console.log(func(arrs))
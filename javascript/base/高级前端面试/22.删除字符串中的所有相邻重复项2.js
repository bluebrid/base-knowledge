const removeRepeat = (str, limit) => {
    if (limit < 2) return ''
    let index = 0;
    let map = new Map()
    let arrs = str.split('')
    while (arrs.length && index < arrs.length - 1) {
        const cur = arrs[index]
        const next = arrs[index + 1]
        if (cur === next) {
            if (!map.has(cur)) {
                map.set(cur, index)
            }
            index++
        } else {
            const startIndex = map.get(cur)
            if (map.has(cur)) {
                if (index - startIndex >= limit - 1) {
                    arrs.splice(startIndex, index - startIndex + 1)
                    index = 0 // 从头开始
                } else {
                    index ++
                }
            } else {
                index ++
            }
        }
    }
    return arrs.join('')
}

const s = 'abbbad', k = 3;
console.log(removeRepeat(s, k))
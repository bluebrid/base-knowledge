const removeRepeat = (str, k) => {
    let arr = str.split('')
    let map = new Map()
    let i = 0;
    while (arr.length && i < arr.length) {
        if (arr[i] === arr[i + 1]) {
            map.set(arr[i], (map.get(arr[i]) || 0) + 1)
            i++
        } else {
            if (map.get(arr[i])) {
                map.set(arr[i], (map.get(arr[i]) || 0) + 1)
            }
            const len = map.get(arr[i])
            if (len >= k) {
                arr.splice(i - len + 1, len)
                i = 0
            } else {
                i++
            }
            map.delete(arr[i])
        }
    }
    return arr
}
const str = 'deeedbbcccbdaa', k = 3;
console.log(removeRepeat(str, k))
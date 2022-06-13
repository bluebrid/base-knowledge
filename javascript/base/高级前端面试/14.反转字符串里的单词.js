const reverse = (word) => {
    const arr = word.split(/\s+/)
    let l = 0, r = arr.length - 1;
    while (l < r) {
        const temp = arr[l]
        arr[l] = arr[r]
        arr[r] = temp
        l++
        r--
    }
    return arr.join(' ')
}
const word = "The Sky a is Blue"
console.log(reverse(word))
const removeDuplicates = (s) => {
    let queue = [];
    for(let l of s) {
        const pre = queue.pop()
        if (l !== pre) {
            queue.push(pre)
            queue.push(l)
        }
    }
    return queue.join('')
}
const s = 'addada'
console.log(removeDuplicates(s))
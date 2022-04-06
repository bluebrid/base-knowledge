function merge(arr) {
    return arr.reduce((init, next, i) => {
        if (!i) {
            init.push(next)
        } else {
            if (next !== init[init.length - 1]) {
                init.push(next)
            }
        }
        return init
    }, [])
}

function merge1(arr) {
    return arr
        .join(",")
        .replace(/(\d,)\1+/g, "$1")
        .split(",")
        .map((e) => +e);
}
// console.log(merge([3, 2, 2, 2, 4, 5, 5, 6, 2, 1]));
const result = []
// -10到10之间的整数，找出所有三个数字之和相加等于10
for (let i = -10; i++; i <= 10) {
    for (let j = i + 1; j++; j <= 10) {
        for (let k = j + 1; k++; k <= 10) {
            if (i + j + k === 10) {
                result.push([i, j, k])
            }
        }
    }
}
console.log(result)

// 生成指定个数的随机数组
const generateArr = (num = 10) => {
    let arr = []
    for (let i = 0; i < num; i++) {
        let item = Math.floor(Math.random() * (num + 1))
        arr.push(item)
    }
    return arr
}

// 生成指定个数的元素x轴坐标
const generateArrPosX = (n = 10, w = 6, m = 6) => {
    let pos = []
    for (let i = 0; i < n; i++) {
        let item = (w + m) * i
        pos.push(item)
    }
    return pos
}

module.exports = {
    generateArr,
    generateArrPosX
}
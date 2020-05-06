// 生成指定个数的排序数组
const generateArr = (num = 10) => {
    let arr = []
    for (let i = 0; i < num; i++) {
        arr.push(i)
    }
    return arr
}
 
module.exports = {
    generateArr
}
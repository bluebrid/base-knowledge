/**
 * @param {number} n
 * @return {string[]}
 */
 var generateParenthesis = function(n) {
    var index = 1
    var res = []
    var temp = []
    while (index <= n) {
        if (index === 1) {
            res = ['()']
        } else {
            // 清空
            temp.splice(0, temp.length)
            
            let len = res.length
            for (let i = 0;i < len;i++) {
                temp.push(handle(res[i]))
            }
            
            // temp二维数组扁平化
            temp = flatten(temp)
            
            // 去重
            res = [... new Set(temp)]
        }
        index++
    }
    
    // console.log(res)
    return res
};
function handle (str) {
    var res = []
    var len = str.length
    var arr = str.split('')
    for (let i = 0;i < len;i++) {
        let tempArr = [...arr]
        tempArr.splice(i, 0, '()')
        res.push(tempArr.join(''))
    }
    
    // 头部
    res.push('()' + str)
    
    return res
}
function flatten (arr) {
    var res = []
    var len = arr.length
    for (let i = 0;i < len;i++) {
        if (Object.prototype.toString.call(arr[i]) === '[object Array]') {
            res = res.concat(flatten(arr[i]))
        } else {
            res.push(arr[i])
        }
    }
    return res
}
console.log(generateParenthesis(3))
/**
 * 将字符串转换成首字母大写
 * @param {字符串} str 
 */
function titleize(str) {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (c) {
        return c.toUpperCase();
    });
}
console.log(titleize('my name is epeli'));

/**
 * 将字符串转换成驼峰
 * @param {字符串} str 
 */
function camelize(str) {
    return str.toLowerCase().replace(/(?:^|[^a-z])+(\w)/g, function(c, $1) {
        return $1.toUpperCase();
    })
}

console.log(camelize(' - moz--transform'));

function dasherize(str) {
    return str.replace(/[A-Z]/g, function (match) {
        return '-'+ match.toLowerCase()
    });
}

console.log( dasherize('MozTransform') );
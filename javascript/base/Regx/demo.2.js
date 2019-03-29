/**
 * 格式化字符串，将特殊字符flag作为标签的开始字符, flag后面的字符作为标签标记
 * /(=(\w))([^=]*)(=)/g
 * @param {字符串}} str 
 * @param {需要格式化的特殊字符} flag
 */
function transform(str, flag) {
    let regx = new RegExp(`(${flag}(\\w))([^${flag}]*)(${flag})`, 'g');
    return str.replace(regx, `<$2>$3</$2>`); 
}

var str = '=gabcd, dsadf ==bsssdff=';
console.log(transform(str, '='));

function transform2(str, flag) {
    let regx = new RegExp(`((${flag})(\\w))([^${flag}]*)\\2`, 'g');
    return str.replace(regx, `<$3>$4</$3>`); 
}

var str = '=gabcd, dsadf ==bsssdff=';
console.log(transform2(str, '='));

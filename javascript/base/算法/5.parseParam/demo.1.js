let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
console.log(parseParam(url))
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/

function parseParam(url) {
    if (!url) {
        return {

        }
    }
    let arr = url.split('?')
    let parms = []
    if (arr.length > 1) {
        parms = arr[arr.length - 1].split('&')
    }
    return parms.reduce((init, next) => {
        var tempArr = next.split('=')
        if (tempArr.length > 1) {
            let key = tempArr[0]
            let value = tempArr[1]
            value = decodeURIComponent(value)
            if (init[key]) {
                if (init[key] instanceof Array) {
                    init[key].push(value)
                } else {
                    let tempValue = init[key]
                    init[key] = [tempValue, value]
                }

            } else {
                init[key] = value
            }
        } else {
            init[tempArr[0]] = true;
        }
        return init
    }, {})
}

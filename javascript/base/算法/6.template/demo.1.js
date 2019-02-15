var template = '我是{{name}}，年龄{{age}}，性别{{sex}}, 省份{{address.add1}}， 区{{address.add2.add4}}';
var data = {
  name: '姓名',
  age: 18,
  address: {
    add1:'广东省',
    add2: {
        add3: '深圳市',
        add4: '宝安区'
    }
  }
}
console.log(render(template, data)); // 我是姓名，年龄18，性别undefined

function render(template, data) {
    function getIn(obj) {
        return (...keys) => {
            return keys.reduce((init, key) => {
                if (obj) {
                    init = obj[key]
                    obj = init;
                    return init;
                } else {
                    return undefined;
                }
            }, undefined)
        }
    }
    return template.replace(/\{\{([\w\.]*)\}\}/gm, function(match, key) {
      return getIn(data)(...key.split('.'))
    })
}
 
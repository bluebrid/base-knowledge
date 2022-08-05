const getIn = (obj, path) => {
    const arr = path.split('.')
    for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i]] === undefined) {
            return undefined
        }
        obj = obj[arr[i]]
    }
    return obj
}
const render = (template, context) => {
    return template.replace(/(\{\{([^\}]{1,})\}\})/g, (m, $1, $2) => {
        return getIn(context, $2)
    })
}
const template = '{{name}}很厉害，才{{age}}岁, 家住在{{address.home}}'
const context = {
    name: 'ivan',
    address: {
        home: 'SZ'
    },
    age: 15
}
console.log(render(template, context))
var domNode = {
    tagName: 'ul',
    props: {
        class: 'list',
        style: {
            width: '100px',
            height: '200px'
        }
    },
    children: [{
        tagName: 'li',
        props: {
            class: 'item'
        },
        children: ['item1']
    }, {
        tagName: 'li',
        children: ['item2']
    }]
};

// 构建一个 render 函数，将 domNode 对象渲染为 以下 dom
/*
<ul class="list">
    <li>item1</li>
    <li>item2</li>
</ul>
*/
console.log(render(domNode))
function render(vNode) {
    if (!vNode) {
        return ''
    }
    const children = vNode.children
    const toString = Object.prototype.toString
    const tagName = vNode.tagName
    const props = vNode.props
    const propsValue = Object.keys(props || {}).reduce((init, key) => {
        if (toString.call(props[key]) === '[object String]') {
            init = init + ' ' + key + '="' + props[key] + '"'
        } else if (toString.call(props[key]) === '[object Array]') {
            init = init + ' ' + key + '="' + props[key].join(' ') + '"'
        } else if (toString.call(props[key]) === '[object Object]') {
            init = init + ' ' + key + '="' + Object.keys(props[key]).reduce((i, k) => {
                return i = i + k + ':' + props[key][k] + ';'
            }, ' ') + '"'
        }
        return init
    }, ' ')
    if (children instanceof Array && children.length > 1) {
        const childrenValue = children.map(c => {
            return render(c)
        }).join(' ')
        return `<${tagName} ${propsValue}>
            ${childrenValue}
        </${tagName}>`
    } else {
        return `<${tagName} ${propsValue}>
        ${children}
    </${tagName}>`
    }
}


// https://juejin.im/post/5ac1c5bf518825558949f898
/**
 * 将Class 转换成function
 */
module.exports = function ({ types: t }) {
    return {
        visitor: {
            ClassDeclaration(path) {
                //拿到老的AST节点
                let node = path.node
                let className = node.id.name
                let classInner = node.body.body
                //创建一个数组用来成盛放新生成AST
                let es5Fns = []
                //初始化默认的constructor节点
                let newConstructorId = t.identifier(className)
                // t.functionDeclaration(id, params, body, generator, async)
                let constructorFn = t.functionDeclaration(newConstructorId, [t.identifier('')], t.blockStatement([]), false, false)
                //循环老节点的AST对象
                for (let i = 0; i < classInner.length; i++) {
                    let item = classInner[i]
                    //判断函数的类型是不是constructor
                    if (item.kind == 'constructor') {
                        let constructorParams = item.params.length ? item.params[0].name : []
                        let newConstructorParams = t.identifier(constructorParams)
                        let constructorBody = classInner[i].body
                        constructorFn = t.functionDeclaration(newConstructorId, [newConstructorParams], constructorBody, false, false)
                    } 
                    //处理其余不是constructor的节点
                    else {
                        // Brid.prototype
                        let protoTypeObj = t.memberExpression(t.identifier(className), t.identifier('prototype'), false)

                        let left = t.memberExpression(protoTypeObj, t.identifier(item.key.name), false)
                        //定义等号右边
                        let prototypeParams = classInner[i].params.length ? classInner[i].params[i].name : []
                        let newPrototypeParams = t.identifier(prototypeParams)
                        let prototypeBody = classInner[i].body
                        // 根据参数， body ， 创建原型函数
                        let right = t.functionExpression(null, [newPrototypeParams], prototypeBody, false, false)
                        let protoTypeExpression = t.assignmentExpression("=", left, right)
                        es5Fns.push(protoTypeExpression)
                    }

                }
                //循环结束，把constructor节点也放到es5Fns中
                es5Fns.push(constructorFn)
                //判断es5Fns的长度是否大于1
                if (es5Fns.length > 1) {
                    path.replaceWithMultiple(es5Fns)
                } else {
                    path.replaceWith(constructorFn)
                }
            }
        }
    };
}


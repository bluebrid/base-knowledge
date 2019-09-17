// https://juejin.im/post/5ac1c5bf518825558949f898
/**
 * 将Class 转换成function
 */
/**
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    sayHi (msg) {
        console.log(`Hi ${msg}, My name is ${name}, i'm ${age} old `)
    }
    eat (food) {
        console.log(`I'm eating ${food}`)
    }
}

Person.prototype.sayHi = function (msg) {
  console.log(`Hi ${msg}, My name is ${name}, i'm ${age} old `);
}

Person.prototype.eat = function (food) {
  console.log(`I'm eating ${food}`);
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
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
                // 先定义一个构造函数的变量
                let constructorFn = null;
                //循环老节点的AST对象
                for (let i = 0; i < classInner.length; i++) {
           
                    let item = classInner[i]
                    //判断函数的类型是不是constructor
                    if (item.kind == 'constructor') {
                        // 先将构造函数里的参数用t.identifier 进行map, 因为t.functionDeclaration创建一个函数，接受的第二个参数是一个indentifier对象的数组
                        let newConstructorParams = item.params.map(param => t.identifier(param.name))
                        // 直接获取获取body, (暂时不出来继承的功能， 也就是super的语法处理)
                        let constructorBody = classInner[i].body
                         //初始化默认的constructor节点
                        let newConstructorId = t.identifier(className)
                        // 创建一个函数的定义： t.functionDeclaration(id, params, body, generator, async)
                        constructorFn = t.functionDeclaration(newConstructorId, newConstructorParams, constructorBody, false, false)
                    } 
                    //处理其余不是constructor的节点
                    else {
                        /**
                         * Person.prototype.eat = function (food) {
                            console.log(`I'm eating ${food}`);
                           }
                         */
                        // 定义等号左边
                        // Person.prototype t.memberExpression(object, property, computed, optional)
                        let protoTypeObj = t.memberExpression(t.identifier(className), t.identifier('prototype'), false)
                        // Person.prototype.eat
                        let left = t.memberExpression(protoTypeObj, t.identifier(item.key.name), false)
                        //定义等号右边
                        // 获取函数的所有的参数
                        let newPrototypeParams = classInner[i].params.map(param => t.identifier(param.name ))
                         
                        // 获取函数的body 
                        let prototypeBody = classInner[i].body
                        // 根据参数， body ， 创建原型函数 t.functionExpression(id, params, body, generator, async)
                        // t.functionExpression 和 t.functionDeclaration,其实差不多，不过一个是函数表达式，一个是函数定义
                        let right = t.functionExpression(null, newPrototypeParams, prototypeBody, false, false)
                        // 将左边和右边进行赋值操作 
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


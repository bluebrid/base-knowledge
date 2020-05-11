
// https://juejin.im/post/5de87444518825124c50cd36
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const t = require('@babel/types')
/**
 *  单一原则: 每个 Loader 只做一件事；
    链式调用: Webpack 会按顺序链式调用每个 Loader；
    统一原则: 遵循 Webpack 制定的设计规则和结构，输入与输出均为字符串，各个 Loader 完全独立，即插即用；
    loader和plugin的区别是，loader 只做一件事情，也就是说一个loader值针对于某个情况处理，如less-loader 
    只处理less文件，因为有配置test正则去匹配文件，但是plugin是针对整个流程执行的广泛任务。
 */
module.exports = function (source) {
    const ast = parser.parse(source, { sourceType: 'module' }) // (解析)将源代码解析成 AST
    traverse(ast, {
        CallExpression(path) {
            if (t.isMemberExpression(path.node.callee) && t.isIdentifier(path.node.callee.object, { name: "console" })) {
                path.remove()//(转换) 对AST节点进行递归遍历，生成一个便于操作、转换的path对象
            }
        }
    })
    const output = generator(ast, {}, source);//(生成) 将AST解码生成js代码
    return output.code
}

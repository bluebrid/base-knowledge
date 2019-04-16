/**
 * https://juejin.im/post/5c21b584e51d4548ac6f6c99
 * 作用域
 * function square(n) {
    return n * n;
   }
    var n = 1;
    将square 的变量n全部替换成x, 但是又不能影响外面的n 变量
 */
module.exports = function ({ types: t }) {
    return {
        name: "transform-arrow-functions",
        visitor: {
            FunctionDeclaration(path, state) {
                const targetName = state.opts.targetName || 'x'
                const updateParamNameVisitor = {
                    Identifier(path) {
                        if (path.node.name === this.paramName) {
                            path.node.name = targetName;
                        }
                    }
                };
                const param = path.node.params[0];
                // 先获取初始化的名称
                paramName = param.name;                
                param.name = targetName;
                path.traverse(updateParamNameVisitor, { paramName });
            }

        }
    };
};
// plugin.js
const updateParamNameVisitor = {
    Identifier(path) {
        if (path.node.name === this.paramName) {
            path.node.name = "x";
        }
    }
};

module.exports = function ({ types: babelTypes }) {
    return {
        name: "deadly-simple-plugin-example",
        visitor: {
            FunctionDeclaration(path) {
                const param = path.node.params[0];
                const paramName = param.name;
                param.name = "x";
        
                path.traverse(updateParamNameVisitor, { paramName });
            }
        }
    };
};

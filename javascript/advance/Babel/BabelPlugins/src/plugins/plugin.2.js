 
module.exports = function ({ types: babelTypes }) {
    return {
        name: "deadly-simple-plugin-example",
        visitor: {
            Identifier: {
                enter(path, state) {
                    console.log("Entered!", path.node.name);
                },
                exit(path, state) {
                    console.log("Exited!");
                }
            },
            // Identifier(path, state) {
            //   if (path.node.name === 'bad') {
            //     path.node.name = 'good';
            //   }
            // },
            Literal(path, state) {
                path.node.value = false
            }
        }
    };
};

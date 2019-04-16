/**
 * 转换箭头函数
 */
module.exports = function ({ types: t }) {
    return {
        name: "transform-arrow-functions",
        visitor: {
            ArrowFunctionExpression(path) {
                console.log('============')
                // In some conversion cases, it may have already been converted to a function while this callback
                // was queued up.
                if (!path.isArrowFunctionExpression()) return;
                if (!path.scope.hasBinding('a')) {
                    console.log('1111111111')
                }
                path.replaceWith(t.functionExpression(path.node.id, path.node.params, path.node.body, path.node.generator, path.node.async));
                // path.arrowFunctionToExpression({
                //   // While other utils may be fine inserting other arrows to make more transforms possible,
                //   // the arrow transform itself absolutely cannot insert new arrow functions.
                //   allowInsertArrow: false 
                // });
              },
        }
    };
};
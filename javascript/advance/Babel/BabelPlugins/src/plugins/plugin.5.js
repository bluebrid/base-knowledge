/**
 * 自定义箭头函数转换
 */
/*
module.exports = function ({ types: t }) {
  return {
    name: "transform-arrow-functions",
    visitor: {
      ArrowFunctionExpression(path, state) {
        // 1. 在.babelrc 配置文件中，如果对应的plugin 配置了额外的参数， 可以通过state.opts 获取
        if (state.opts.disable) return;
        // 2. 先判断是否是箭头函数，如果不是则直接退出
        if (!path.isArrowFunctionExpression()) return;
        // 3. 根据path获取node,已经对应的属性
        let { node } = path;
        let body = node.body;
        let params = node.params;
        // 4. path.replaceWith(t.functionExpression(path.node.id, path.node.params, path.node.body, path.node.generator, path.node.async));
        // 因为functionExpression 的第三个参数body 需要接受的是一个BlockStatement 对象，所以先判断是否是BlockStatement对象，如果不是则将body 转换成BlockStatement 对象， 
        // 因为const add = (a, b) => a + b的body是一个BinaryExpression类型
        // 在conversion.js中的ensureBlock 方法就做了如下的逻辑：
        // D:\private\bluebrid\base-knowledge\javascript\advance\Babel\BabelPlugins\node_modules\babel-traverse\lib\path\conversion.js
        // function ensureBlock() {
        //   return t.ensureBlock(this.node);
        // }
        if (!t.isBlock(body)) {
          body = t.toBlock(body, node);
        }
        // 5. 创建一个function 表达式
        let r = t.functionExpression(null, params, body, false, false);
        // 6. 将创建的function 表达式替换之前的箭头函数
        path.replaceWith(r);
      },
    }
  };
};
*/
// babel-plugin-transform-es2015-arrow-functions

module.exports = function (_ref) {
  var t = _ref.types;

  return {
    visitor: {
      ArrowFunctionExpression: function ArrowFunctionExpression(path, state) {
        if (state.opts.spec) {
          var node = path.node;

          if (node.shadow) return;

          node.shadow = { this: false };
          node.type = "FunctionExpression";

          var boundThis = t.thisExpression();
          boundThis._forceShadow = path;

          path.ensureBlock();
          path.get("body").unshiftContainer("body", t.expressionStatement(t.callExpression(state.addHelper("newArrowCheck"), [t.thisExpression(), boundThis])));

          path.replaceWith(t.callExpression(t.memberExpression(node, t.identifier("bind")), [t.thisExpression()]));
        } else {
          path.arrowFunctionToShadowed();
        }
      }
    }
  };
};

const $root = document.querySelector("#root1");
const App = props => {
  return React.createElement("h1", { className: "title", ...props }, "1");
}
App.displayName = "App-displayName "// 用来调试时候显示的名称
App.defaultProps = {// 如果设置了默认的属性， 如果传递的属性值为undefined则去defaultProps中对应的值

}
// const App = props => React.createElement("h1", { key: "1" }, "1");
/**
 * createElementWithValidation(type, props, children) 可以接受三个参数：
 * 1. type(string, function ...)
 * 2. props(key, ref 是两个特殊的属性),
 * 3, children(子组件)，
 * createElement 返回的是一个对象：
 *  {
 *  $$typeof: Symbol(react.element)
    type: ƒ App(props)
    key: "App"
    ref: null
    props: {config1: "configValue"}
    _owner: null
    _store: {validated: false}
    _self: null
    _source: null
 * 
 * }
 */
ReactDOM.render(React.createElement(App, {
  config1: 'configValue',
  key: 'App', // 有两个特殊属性： key, ref, 其他的属性，都会通过props 传递
  // ref: 'ref'
}), $root, () => {
  console.log("render done");
  console.log($root._reactRootContainer)
});

// http://prismjs.com/plugins/normalize-whitespace/
Prism.plugins.NormalizeWhitespace.setDefaults({
  "remove-trailing": true,
  "remove-indent": true,
  "left-trim": true,
  "right-trim": true
  /*'break-lines': 80,
                     'indent': 2,
                     'remove-initial-line-feed': false,
                     'tabs-to-spaces': 4,
                     'spaces-to-tabs': 4*/
});

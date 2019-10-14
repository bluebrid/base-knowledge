const $root = document.querySelector("#root1");
const App = props =>
  React.createElement("h1", { key: "1" }, "1");


ReactDOM.render(
  React.createElement(App, null),
  $root,
  () => {
    console.log('render done')
  });



























// http://prismjs.com/plugins/normalize-whitespace/
Prism.plugins.NormalizeWhitespace.setDefaults({
  'remove-trailing': true,
  'remove-indent': true,
  'left-trim': true,
  'right-trim': true
  /*'break-lines': 80,
                     'indent': 2,
                     'remove-initial-line-feed': false,
                     'tabs-to-spaces': 4,
                     'spaces-to-tabs': 4*/ });
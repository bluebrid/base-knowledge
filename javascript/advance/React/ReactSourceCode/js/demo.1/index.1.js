const App = props => [
React.createElement("h1", { key: "1" }, "Demo 16.8.6"),
React.createElement("p", { key: "2" }, "Render array of elements")];


ReactDOM.render(
React.createElement(App, null),
document.querySelector("#root"));






























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
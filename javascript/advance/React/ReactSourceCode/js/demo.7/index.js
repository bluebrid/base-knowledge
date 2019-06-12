/**
 * hooks
 */

const $root = document.querySelector("#root");
 
function App() {
    const [count, setCount] = React.useState(0)
    return (
      <button onClick={() => setCount(count + 1)}>
          Click me ({count})
      </button>
    )
}

ReactDOM.render(<App />, $root);



























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
const $root = document.querySelector("#root3");
class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      count: 0
    }
    this.onClick = this.onClick.bind(this)
  }
  onClick() {
    this.setState({
      count: this.state.count + 1
    }, () => {
      console.log('setState Done!')
    })
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 1
    })
    this.setState({
      count: this.state.count + 1
    })
    console.log(this.state.count)
  }
  componentDidMount() {
    document.querySelector('button').addEventListener('click', this.onClick, false)
  }
  render() {
    console.log('===================')
    return React.createElement("button", {}, `Click Me(${this.state.count})`);
  }
}
// React 18, 必须使用`createRoot`才能`automatic Batching`
// const root = ReactDOM.createRoot(
//   $root
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


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
const $root = document.querySelector("#root");
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
    console.log(this.state.count)
  }
  componentDidMount() {
    document.querySelector('button').addEventListener('click', this.onClick, false)
  }
  render() {
    return React.createElement("button", {}, `Click Me(${this.state.count})`);
  }
}

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
const $root = document.querySelector("#root2");
class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      count: 1
    }
    this.onClick = this.onClick.bind(this)
    this.onClickCapture = this.onClickCapture.bind(this)
  }
  onClick() {
    this.setState({
      count: this.state.count + 1
    }, () => {
      console.log(`setState Done! -> ${this.state.count}`)
    })
    console.log(this.state.count)
  } 

  onClickCapture(e, a, b, c) {
    console.log('onClickCapture')
  }
  render() {
    return React.createElement("button", { onClick: this.onClick }, `Click Me(${this.state.count})`);
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
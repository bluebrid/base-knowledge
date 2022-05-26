/**
 * 添加componentDidMount生命周期函数
 */
const $root = document.querySelector("#root4");
class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      count: 1
    }
    this.onClick = this.onClick.bind(this)
  }
  onClick() {
    this.setState({
      count: this.state.count + 1
    }, () => {
      console.log(`setState Done! -> ${this.state.count}`)
    })
    console.log(this.state.count)
  }
  // UNSAFE_componentWillMount() {
  //   console.log('UNSAFE_componentWillMount', 'red')
  // }

  static getDerivedStateFromProps(nextProps, preState) {
    /**
     * 这个方法在建议尽量少用，只在必要的场景中使用，一般使用场景如下：
       1. 无条件的根据 props 更新 state
       2. 当 props 和 state 的不匹配情况更新 state
       getDerivedStateFromProps exists for only one purpose. It enables a component to update its internal state as the result of changes in props.
     */
    console.log(`getDerivedStateFromProps`)
    if (nextProps.count !== preState.count) {
      return {
        count: preState.count ? preState.count : nextProps.count, // 因为同时存在通过setState 和props 去更新state, 所以需要去判断到底是哪个在更新状态， 所以其实更适用与state只根据props 来更新的情况
        updateByState: false
      }
    }
    return null
  }

 
  render() {
    return React.createElement("button", { onClick: this.onClick }, `Click Me(${this.state.count})`);
  }

  componentDidMount() {
    console.log('componentDidMount')
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
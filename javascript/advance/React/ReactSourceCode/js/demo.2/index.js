const $root = document.querySelector("#root2");
class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      count: 1,
      inputValue: 0
    };
    this.onClick = this.onClick.bind(this);
    this.onClickCapture = this.onClickCapture.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onClick() {
    /**
     * 1. 我们执行setState, 使用方式是this.setState, 可以发现， setState 是React.Component 的一个实例方法，定义在React.development.js 文件中
     * 2. 查看这个方法的代码， 发现其其实引用的是this.updater.enqueueSetState 方法
     *   Component.prototype.setState = function (partialState, callback) {
          !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
          log(`(setState)调用setState方法`)
          this.updater.enqueueSetState(this, partialState, callback, 'setState');
        };
     * 3. 而this.updater 是我们在初始化组件的时候赋予初始化值的
        function Component(props, context, updater) {
            this.props = props;
            this.context = context;
            // If a component has string refs, we will assign a different object later.
            this.refs = emptyObject;
            // We initialize the default updater but the real one gets injected by the
            // renderer.
            this.updater = updater || ReactNoopUpdateQueue;
          }
     * 4. 我们在创建Component 组件的时候， 是没有传递updater的， 所以他的默认值是ReactNoopUpdateQueue
     * 5. 但是我们发现ReactNoopUpdateQueue 的初始化的都是几个空的函数
     * 6. 但是当我们跳入this.updater.enqueueSetState 的时候， 跳转到的是react-dom.development.js 文件中的classComponentUpdater.enqueueSetState方法
     * 7. 其实我们在创建Component 组件实例的时候， 在adoptClassInstance方法中对组件的实例进行了处理， instance.updater = classComponentUpdater;
     */
    this.setState(
      {
        count: this.state.count + 1
      },
      () => {
        console.log(`setState Done! -> ${this.state.count}`);
      }
    );
    console.log(this.state.count);
  }
  onChange(e) {
    setTimeout(() => {
      this.setState({
        inputValue: this.state.inputValue + 1
      });
      this.setState({
        inputValue: this.state.inputValue + 2
      });
      this.setState({
        inputValue: this.state.inputValue + 3,
        testValue: 111
      });
    })
    // this.setState({
    //   inputValue: this.state.inputValue + 1
    // });
    // this.setState({
    //   inputValue: this.state.inputValue + 1
    // });
    // this.setState({
    //   inputValue: this.state.inputValue + 1
    // });
   
  }
  onClickCapture(e, a, b, c) {
    console.log("onClickCapture");
  }
  componentDidMount() {
    // console.log("========================componentDidMount");
    // this.setState({
    //   inputValue: this.state.inputValue + 1
    // });
    // this.setState({
    //   inputValue: this.state.inputValue + 2
    // });
    // this.setState({
    //   inputValue: this.state.inputValue + 3
    // });
  }
  static getDerivedStateFromProps(nextProps, preState) {
    /**
     * 这个方法在建议尽量少用，只在必要的场景中使用，一般使用场景如下：
       1. 无条件的根据 props 更新 state
       2. 当 props 和 state 的不匹配情况更新 state
       getDerivedStateFromProps exists for only one purpose. It enables a component to update its internal state as the result of changes in props.
     */
    // console.log(`getDerivedStateFromProps`)
    if (nextProps.count !== preState.count) {
      return {
        count: preState.count ? preState.count : nextProps.count, // 因为同时存在通过setState 和props 去更新state, 所以需要去判断到底是哪个在更新状态， 所以其实更适用与state只根据props 来更新的情况
        updateByState: false
      };
    }
    return null;
  }
  render() {
    // return React.createElement("button", { onClick: this.onClick }, `Click Me(${this.state.count})`);
    // return React.createElement("div", null, [
    //   React.createElement("button", { onClick: this.onClick , key: '1'}, `1.Click Me(${this.state.count})`),
    //   React.createElement("button", { onClick: this.onClick, key: '2' }, `2.Click Me(${this.state.count})`)
    // ]);
    // return (
    //   <div>
    //     <button onClick={this.onClick} key="1">1.Click Me{this.state.count}</button>
    //     <button onClick={this.onClick} key="2">21.Click Me{this.state.count}</button>
    //   </div>
    // )
    console.log('===========================================================')
    return (
      <div>
        <button onClick={this.onClick} key="1">
          1.Click Me{this.state.count}
        </button>
        <input onChange={this.onChange} key="2" value={this.state.inputValue} />
      </div>
    );
  }
  getSnapshotBeforeUpdate(preProps, preState) {
    /**
     * React v16.3还引入了一个新的声明周期函数getSnapshotBeforeUpdate，
     * 这函数会在render之后执行，而执行之时DOM元素还没有被更新，给了一个机会去获取DOM信息，
     * 计算得到一个snapshot，这个snapshot会作为componentDidUpdate的第三个参数传入。
     * 官方给了一个例子，用getSnapshotBeforeUpdate来处理scroll，
     * 坦白说，我也想不出其他更常用更好懂的需要getSnapshotBeforeUpdate的例子，
     * 这个函数应该大部分开发者都用不上（听得懂我的潜台词吗：不要用！)
     * getSnapshotBeforeUpdate 是在render之后触发，它的要点在于触发时，Dom还没有更新，开发者可以做一些事情，返回值会作为第三个参数传递给接下来将要触发的componentDidUpdate。
     */
    // log('getSnapshotBeforeUpdate', COLORS.UPDATING)
    return "snap value .";
  }
  componentDidUpdate(preProps, preState, snap) {
    console.log("componentDidUpdate");
    console.log("componentDidUpdate Snap Value: " + snap);
  }
}

ReactDOM.render(React.createElement(App, null), $root, () => {
  console.log("render done");
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

const $root = document.querySelector("#root13");
const themes = {
  red: {
    foreground: "#ffffff",
    background: "red"
  },
  green: {
    foreground: "#000000",
    background: "green"
  }
};

let ThemeContext = React.createContext({
  themes: themes.green, // 默认值
  toggleTheme: () => {}
});

ThemeContext = new Proxy(ThemeContext, {
  get: function(target, key, receiver) {
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, receiver) {
    return Reflect.set(target, key, receiver);
  }
});

function ThemedButton1(props) {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button
          onClick={toggleTheme}
          style={{ backgroundColor: theme.background }}
        >
          Toggle Theme 1
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

function ThemedButton2(props) {
  /*
    return (<button>
        Toggle Theme 2
    </button>)*/
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button
          onClick={toggleTheme}
          style={{ backgroundColor: theme.background }}
        >
          Toggle Theme 2
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

/*
class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTheme = () => {
      this.setState(state => ({
        theme: state.theme === themes.red ? themes.green : themes.red
      }));
    };
    this.state = {
      theme: themes.green,
      toggleTheme: this.toggleTheme
    };
  }

  render() {
    // ThemedButton 位于 ThemeProvider 内
    // 在外部使用时使用来自 state 里面的 theme
    // 默认 dark theme
    return (
      <ThemeContext.Provider value={this.state}>
        <ThemedButton1 />
        <ThemedButton2 />
      </ThemeContext.Provider>
    );
  }
}*/

function App() {
  /**
   * 1. React.createContext 其实相当于是一个全局变量
   * 1.当点击button, 会执行toggleTheme, 则会重新渲染App, 而button1, button2, 是其对应的子组件，则也会渲染
   * 2.当再次渲染子组件的时候， ThemeContext也有了新的value , 所以只要子组件调用了ThemeContext.Consumer都会获取最新的值， 重新渲染
   * 3. 在再次渲染的时候， 最将最新的value 给覆盖，也就是说在再次渲染的时候， 子组件获取到的value就是最新的值：
   * workLoop -> performUnitOfWork -> beginWork -> updateContextProvider(workInProgress.pendingProps.value 对应的就是最新的value 值) -> pushProvider
   * function pushProvider(providerFiber, nextValue) {
        var context = providerFiber.type._context;

        if (isPrimaryRenderer) {
            push(valueCursor, context._currentValue, providerFiber);

            context._currentValue = nextValue;
            {
            !(context._currentRenderer === undefined || context._currentRenderer === null || context._currentRenderer === rendererSigil) ? warningWithoutStack$1(false, 'Detected multiple renderers concurrently rendering the ' + 'same context provider. This is currently unsupported.') : void 0;
            context._currentRenderer = rendererSigil;
            }
        } else {
            push(valueCursor, context._currentValue2, providerFiber);

            context._currentValue2 = nextValue;
            {
            !(context._currentRenderer2 === undefined || context._currentRenderer2 === null || context._currentRenderer2 === rendererSigil) ? warningWithoutStack$1(false, 'Detected multiple renderers concurrently rendering the ' + 'same context provider. This is currently unsupported.') : void 0;
            context._currentRenderer2 = rendererSigil;
            }
        }
        }
   */
  let [theme, toggleTheme] = React.useState(themes.green);
  let proxyObj = {
    theme: theme,
    toggleTheme: function() {
      return toggleTheme(
        theme.background === themes.red.background ? themes.green : themes.red
      );
    }
  };
  proxyObj = new Proxy(proxyObj, {
    get: function(target, key, receiver) {
      console.log(key);
      return Reflect.get(target, key, receiver);
    },
    set: function(target, key, value, receiver) {
      console.log(`setting ${key}!`);
      return Reflect.set(target, key, value, receiver);
    }
  });
  return (
    <ThemeContext.Provider value={proxyObj}>
      <ThemedButton1 />
      <ThemedButton2 />
    </ThemeContext.Provider>
  );
}

ReactDOM.render(<App />, $root);

import React, { Component } from 'react';
import './App.css';
import { ThemeContext, themes } from './context/theme-context';
import ThemedButton from './components/themed-button';
import ThemedButton2 from './components/themed-button2';

// 一个使用到ThemedButton组件的中间组件
function Toolbar(props) {
  return (
    <>
    <ThemedButton />
    <ThemedButton2 />
    </>
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.red
            ? themes.green
            : themes.red
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
      <div className="section" data-title="1 newcontext">
        <ThemeContext.Provider value={this.state}>
          <Toolbar />
        </ThemeContext.Provider>
        <div>
          {/* <ThemedButton>
            No Provider
          </ThemedButton> */}
        </div>
      </div>
    );
  }
}
export default App;
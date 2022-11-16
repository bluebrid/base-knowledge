// import React from 'react'
import {ThemeContext} from '../context/theme-context'

function ThemedButton(props) {
  return (
    <ThemeContext.Consumer>
     {({theme, toggleTheme}) => (
        <button
          onClick={toggleTheme}
          style={{backgroundColor: theme.background}}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemedButton;
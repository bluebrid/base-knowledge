import React from 'react'
export const themes = {
    red: {
        foreground: '#ffffff',
        background: 'red',
    },
    green: {
        foreground: '#000000',
        background: 'green',
    },
};

export const ThemeContext = React.createContext({
    themes: themes.green, // 默认值
    toggleTheme: () => {}
});
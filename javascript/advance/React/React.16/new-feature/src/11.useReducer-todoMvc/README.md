1. 创建一个TodoContext.js 文件， `const TodoContext = React.createContext(undefined);` , 创建一个React的上下文
2. 创接一个TodoProvider.js文件， 是一个React的HOC(高阶组件)
```jsx
export const TodoProvider = ({ reducer, initialState, children }) => (
	<TodoContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</TodoContext.Provider>
);
```
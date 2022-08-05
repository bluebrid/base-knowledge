<<<<<<< HEAD
## 11.useReducer-todoMvc

1. 创建一个TodoContext.js 文件， `const TodoContext = React.createContext(undefined);` , 创建一个React的上下文
2. 创接一个TodoProvider.js文件， 是一个React的HOC(高阶组件)
```jsx
export const TodoProvider = ({ reducer, initialState, children }) => (
	<TodoContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</TodoContext.Provider>
);
```
 2.1. 其中TodoContext就是在第二步创建的context, 创建一个context的Provider的内置组件
 2.2 利用`useReducer(reducer, initialState)` 提供value, 其中`useReducer` 使用方式如下：
 ```javascript
 const [state, dispatch] = useReducer(reducer, { value: 0, loading: false });
 ```
 `useReducer`接收两个参数：reducer和initialState， 返回数组，第一个是返回的状态，第二个是一个dispatch函数
 3. 创建一个App.js 文件，也就是根组件：
 ```jsx
 const App = () => (
	<TodoProvider initialState={initialState} reducer={reducer}>
		<div>
			<Header />
			<MainSection />
		</div>
	</TodoProvider>
);
=======
## 11.useReducer-todoMvc

1. 创建一个TodoContext.js 文件， `const TodoContext = React.createContext(undefined);` , 创建一个React的上下文
2. 创接一个TodoProvider.js文件， 是一个React的HOC(高阶组件)
```jsx
export const TodoProvider = ({ reducer, initialState, children }) => (
	<TodoContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</TodoContext.Provider>
);
```
 2.1. 其中TodoContext就是在第二步创建的context, 创建一个context的Provider的内置组件
 2.2 利用`useReducer(reducer, initialState)` 提供value, 其中`useReducer` 使用方式如下：
 ```javascript
 const [state, dispatch] = useReducer(reducer, { value: 0, loading: false });
 ```
 `useReducer`接收两个参数：reducer和initialState， 返回数组，第一个是返回的状态，第二个是一个dispatch函数
 3. 创建一个App.js 文件，也就是根组件：
 ```jsx
 const App = () => (
	<TodoProvider initialState={initialState} reducer={reducer}>
		<div>
			<Header />
			<MainSection />
		</div>
	</TodoProvider>
);
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
 ```
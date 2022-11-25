## [从 React 源码彻底搞懂 Ref 的全部 api](https://juejin.cn/post/7166224289383841823?share_token=bac34d68-cbe2-49cb-b49c-64c7448c66be)

## 使用方式
```tsx
// 函数组件使用useRef Hooks
import React, { useRef, useEffect } from "react";

export default function App() {
  const inputRef = useRef();

  useEffect(()=> {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="text" />
}
```
```tsx
// class 组件使用React.createRef
import React from "react";

export default class App  extends React.Component{
  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    return <input ref={this.inputRef} type="text" />
  }
}
```
```tsx
// 转发ref 给父组件，使用forwardRef
import React, { useRef, forwardRef, useImperativeHandle, useEffect } from "react";

const ForwardRefMyInput = forwardRef(
  function(props, ref) {
    return <input {...props} ref={ref} type="text" />
  }
)

export default function App() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [])

  return (
    <div className="App">
      <ForwardRefMyInput ref={inputRef} />
    </div>
  );
}
```

```tsx
// 转发给父组件，并且可以自定义传给父元素， 使用useImperativeHandle,传递一个对象
import React, { useRef, forwardRef, useImperativeHandle, useEffect } from "react";

const ForwardRefMyInput = forwardRef(
  function(props, ref) {
    const inputRef = useRef();

    useImperativeHandle(ref, () => {
      return {
        aaa() {
          inputRef.current.focus();
        }
      }
    });

    return <input {...props} ref={inputRef} type="text" />
  }
)

export default function App() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.aaa();
  }, [])

  return (
    <div className="App">
      <ForwardRefMyInput ref={inputRef} />
    </div>
  );
}
```
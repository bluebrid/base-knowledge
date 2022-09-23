import React, { useRef, useImperativeHandle } from 'react';

/**
 * https://juejin.cn/post/7118937685653192735?share_token=b06ac11f-deff-4304-b8d3-eff06d9a5302#heading-22
 * 1. 父组件使用useRef(或createRef)创建一个ref对象，将这个ref对象赋给子组件的ref属性
 * 2. 子组件使用forwardRef包装自己，允许作为函数组件的自己使用ref。然后使用useImperativeHandle钩子函数，在第二个函数参数在内部返回状态，这个被返回的状态就可以被父组件访问到。
 * 3. 父组件使用创建的ref对象的current属性获取子组件暴露出的属性或方法。
 */
const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    log: () => {
      console.log('This is Log Event')
    }
  }));
  return <input ref={inputRef} type="text" />
});

const App = props => {
  const fancyInputRef = useRef();
  return (
    <div className="section" data-title="19 useImperativeHandle">
      <FancyInput ref={fancyInputRef} />
      <button
        onClick={() => {
          fancyInputRef.current.focus()
          fancyInputRef.current.log()
        }}      // 调用子组件的方法
      >父组件调用子组件的 focus</button>
    </div>
  )
}
export default App;
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // 使用state来保存当前组件的错误信息
    this.state = { error: null };
  }
  // 就是这个函数实现了error boundary的功能，用来返回错误出现后的state
  static getDerivedStateFromError(error: any) {
    return { error };
  }
  render() {
    // 如果组件发生了错误那么就展示错误的信息否则渲染子组件的内容
    if (this.state.error) {
      return <div>error occur</div>;
    }
    return this.props.children;
  }
}

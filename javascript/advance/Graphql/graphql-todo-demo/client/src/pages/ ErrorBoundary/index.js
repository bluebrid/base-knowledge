import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  unstable_handleError() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>demo error.</h1>;
    }
    return this.props.children;
  }
}

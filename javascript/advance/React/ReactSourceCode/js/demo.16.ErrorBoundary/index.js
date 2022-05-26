const $root = document.querySelector("#root16");

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any child components and re-renders with an error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.error) {
      // Fallback UI if an error occurs
      return (
        <div className="error-boundary">
          <h2>{"Oh-no! Something went wrong"}</h2>
          <p className="red">
            {this.state.error && this.state.error.toString()}
          </p>
          <div>{"Component Stack Error Details: "}</div>
          <p className="red">{this.state.errorInfo.componentStack}</p>
        </div>
      );
    }
    // component normally just renders children
    return this.props.children;
  }
}

class BuggyButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      releaseBugs: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      releaseBugs: true
    });
  }

  render() {
    if (this.state.releaseBugs) {
      throw new Error("I crashed!");
    }
    return (
      <button className="btn" onClick={this.handleClick}>
        {"Scary Button!"}
      </button>
    );
  }
}

function App() {
  return (
    <div className="section">
      <ErrorBoundary>
        <BuggyButton />
      </ErrorBoundary>
    </div>
  );
}

ReactDOM.render(<App />, $root);

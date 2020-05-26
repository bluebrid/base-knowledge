import React from "react";
import { Router } from "react-router";
import { createBrowserHistory as createHistory } from "history";
import PropTypes from "prop-types";
import warning from "tiny-warning";

/**
 * The public API for a <Router> that uses HTML5 history.
 */
class BrowserRouter extends React.Component {
  /**
   * 1. props:
   * forceRefresh: 表示会刷新整个页面：  window.location.replace(href);
   * getUserConfirmation： 
   */
  history = createHistory(this.props);

  render() {
    // return <div>Browser history</div>
    return <Router history={this.history} children={this.props.children} />;
  }
}

if (__DEV__) {
  BrowserRouter.propTypes = {
    basename: PropTypes.string, // basename="demo"， URL 会变成 http://localhost:8080/demo/two
    children: PropTypes.node,
    /**
     * 在history 中判断，如果添加forceRefresh 就会重定向， 也就是刷新页面
     *  if (forceRefresh) {
            window.location.href = href;
          } else {
     */
    forceRefresh: PropTypes.bool, // forceRefresh=true， 路由改变，会强制刷新页面
    getUserConfirmation: PropTypes.func, // 路由守护的处理 getUserConfirmation={getConfirmation}
    /**
     * const getConfirmation = (message, callback) => {
        const allowTransition = window.confirm(message + ';custom prop')
        callback(allowTransition)
      }
     */
    keyLength: PropTypes.number
  };

  BrowserRouter.prototype.componentDidMount = function() {
    warning(
      !this.props.history,
      "<BrowserRouter> ignores the history prop. To use a custom history, " +
        "use `import { Router }` instead of `import { BrowserRouter as Router }`."
    );
  };
}

export default BrowserRouter;

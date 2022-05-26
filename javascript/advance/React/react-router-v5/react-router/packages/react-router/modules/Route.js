import React from "react";
// import { isValidElementType } from "react-is";
import PropTypes from "prop-types";
import invariant from "tiny-invariant";
import warning from "tiny-warning";

import RouterContext from "./RouterContext.js";
import matchPath from "./matchPath.js";

function isEmptyChildren(children) {
  return React.Children.count(children) === 0;
}

function evalChildrenDev(children, props, path) {
  const value = children(props);

  warning(
    value !== undefined,
    "You returned `undefined` from the `children` function of " +
      `<Route${path ? ` path="${path}"` : ""}>, but you ` +
      "should have returned a React element or `null`"
  );

  return value || null;
}

/**
 * The public API for matching a single path and rendering.
 */
class Route extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          invariant(context, "You should not use <Route> outside a <Router>");
          /**
           *<Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
            </Switch>
           */
          const location = this.props.location || context.location;
          // {pathname: "/two", search: "", hash: "", state: null, key: "k521sm"}
          // <Route path="/" exact component={Form} /> match 是去匹配当前组件是否匹配对应的location 
          const match = this.props.computedMatch
            ? this.props.computedMatch // <Switch> already computed the match for us
            : this.props.path
            ? matchPath(location.pathname, this.props)
            : context.match;

          const props = { ...context, location, match };

          let { children, component, render } = this.props;

          // Preact uses an empty array as children by
          // default, so use null if that's the case.
          if (Array.isArray(children) && children.length === 0) {
            children = null;
          }

          return (
            /** 
             * Route 有三种渲染的方法：
             * 1. <Route path="/" exact component={Form} /> 
             *  <Route path="/user/:username" component={User}/>
                const User = ({ match }) => {
                  return <h1>Hello {match.params.username}!</h1>
                }
             * 2. <Route path="/" exact render={Form} /> 
             // convenient inline rendering
              <Route path="/home" render={() => <div>Home</div>}/>

              // wrapping/composing
              const FadingRoute = ({ component: Component, ...rest }) => (
                <Route {...rest} render={props => (
                  <FadeIn>
                    <Component {...props}/>
                  </FadeIn>
                )}/>
              )
             * 3. <Route path="/" exact children={Form} /> 
             <ul>
                <ListItemLink to="/somewhere"/>
                <ListItemLink to="/somewhere-else"/>
              </ul>

              const ListItemLink = ({ to, ...rest }) => (
                <Route path={to} children={({ match }) => (
                  <li className={match ? 'active' : ''}>
                    <Link to={to} {...rest}/>
                  </li>
                )}/>
              )

              <Route children={({ match, ...rest }) => (
                <Animate>
                {match && <Something {...rest}/>}
              </Animate>
              )}/>
            */
           // 优先级： component > render > children (文档是这样，但是从代码层面分析，应该是如下的方式)
           // 优先级： children > component > render
            <RouterContext.Provider value={props}>
              {props.match // 表示如果当前组件匹配上了 
                ? children // <Route path="/" exact component={Form} /> 这里涉及了Route 的几种写法
                  ? typeof children === "function"
                    ? __DEV__
                      ? evalChildrenDev(children, props, this.props.path)
                      : children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === "function"
                ? __DEV__
                  ? evalChildrenDev(children, props, this.props.path)
                  : children(props) // children 会将所有的props 传递进去
                : null// 如果当前组件没有匹配上， 则render 一个null 
              } 
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

if (__DEV__) {
  Route.propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    component: (props, propName) => {
      // if (props[propName] && !isValidElementType(props[propName])) {
      //   return new Error(
      //     `Invalid prop 'component' supplied to 'Route': the prop is not a valid React component`
      //   );
      // }
    },
    exact: PropTypes.bool, // 如果为 true，则只有在路径完全匹配 location.pathname 时才匹配。
    location: PropTypes.object,
    path: PropTypes.oneOfType([ // 任何 path-to-regexp 可以解析的有效的 URL 路径
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    render: PropTypes.func,
    sensitive: PropTypes.bool, // 如果路径区分大小写，则为 true ，则匹配。
    strict: PropTypes.bool // https://react-router.docschina.org/web/api/Route/strict-bool
  };

  Route.prototype.componentDidMount = function() {
    warning(
      !(
        this.props.children &&
        !isEmptyChildren(this.props.children) &&
        this.props.component
      ),
      "You should not use <Route component> and <Route children> in the same route; <Route component> will be ignored"
    );

    warning(
      !(
        this.props.children &&
        !isEmptyChildren(this.props.children) &&
        this.props.render
      ),
      "You should not use <Route render> and <Route children> in the same route; <Route render> will be ignored"
    );

    warning(
      !(this.props.component && this.props.render),
      "You should not use <Route component> and <Route render> in the same route; <Route render> will be ignored"
    );
  };

  Route.prototype.componentDidUpdate = function(prevProps) {
    warning(
      !(this.props.location && !prevProps.location),
      '<Route> elements should not change from uncontrolled to controlled (or vice versa). You initially used no "location" prop and then provided one on a subsequent render.'
    );

    warning(
      !(!this.props.location && prevProps.location),
      '<Route> elements should not change from controlled to uncontrolled (or vice versa). You provided a "location" prop initially but omitted it on a subsequent render.'
    );
  };
}

export default Route;

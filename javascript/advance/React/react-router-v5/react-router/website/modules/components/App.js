import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import basename from "../basename.js";
import DelegateMarkdownLinks from "./DelegateMarkdownLinks.js";
import Home from "./Home/index.js";
import Environment from "./Environment.js";

export default function App() {
  return (
    <Router basename={basename}>
      <DelegateMarkdownLinks>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/:environment" component={Environment} />
        </Switch>
      </DelegateMarkdownLinks>
    </Router>
  );
}
 

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// // This site has 3 pages, all of which are rendered
// // dynamically in the browser (not server rendered).
// //
// // Although the page does not ever refresh, notice how
// // React Router keeps the URL up to date as you navigate
// // through the site. This preserves the browser history,
// // making sure things like the back button and bookmarks
// // work properly.

// const getConfirmation = (message, callback) => {
//   const allowTransition = window.confirm(message)
//   callback(allowTransition)
// }

// export default function BasicExample() {
//   return (
//     <Router getUserConfirmation={getConfirmation}>
//       <div>
//         <ul>
//           <li>
//             <Link  to="/">Home</Link>
//           </li>
//           <li>
//             <Link  to="/about">About</Link>
//           </li>
//           <li>
//             <Link  to="/dashboard">Dashboard</Link>
//           </li>
//         </ul>

//         <hr />

//         {/*
//           A <Switch> looks through all its children <Route>
//           elements and renders the first one whose path
//           matches the current URL. Use a <Switch> any time
//           you have multiple routes, but you want only one
//           of them to render at a time
//         */}
//         <Switch>
//           <Route exact path="/">
//             <Home />
//           </Route>
//           <Route path="/about">
//             <About />
//           </Route>
//           <Route path="/dashboard">
//             <Dashboard />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }

// // You can think of these components as "pages"
// // in your app.

// function Home() {
//   return (
//     <div>
//       <h2>Home</h2>
//     </div>
//   );
// }

// function About() {
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }

// function Dashboard() {
//   return (
//     <div>
//       <h2>Dashboard</h2>
//     </div>
//   );
// }

// import React from "react";
// import { BrowserRouter as Router, Route, Link, Prompt , Redirect } from "react-router-dom";
// const getConfirmation = (message, callback) => {
//   const allowTransition = window.confirm(message + ';custom prop')
//   callback(allowTransition)
// }
// const onClick = (e) => {
//   console.log('click Link.')
// }
// const loggedIn = false
// const PreventingTransitionsExample = () => (
  
//   <Router basename="demo" forceRefresh={false} getUserConfirmation={getConfirmation}>
//     <div>
//       <ul>
//         <li>
//           <Link to="/" onClick={onClick}>Form</Link>
//         </li>
//         <li>
//           <Link to="/one">One</Link>
//         </li>
//         <li>
//           <Link to="/one1">One1</Link>
//         </li>
//         <li>
//           <Link to="/two">Two</Link>
//         </li>
//         <li>
//           <Link to="/home ">Home Page </Link>
//         </li>
//         <li>
//           <Link to="/login">Login</Link>
//         </li>
//       </ul>
//       <Route path="/" exact render={(props) => <Form {...props}/>} />
//       <Route path="/one" render={() => <h3>One</h3>} />
//       <Route path="/one1" render={() => <h3>One1</h3>} />
//       <Route path="/two" render={() => <h3>Two</h3>} />
//       <Route path="/login" render={() => <h3>Login Page</h3>} />
//       <Route path="/home" render={() => {
//         console.log(loggedIn)
//         return (
//         !loggedIn ? (
//           <Redirect to="/login"/>
//         ) : (
//           <div>Home Page</div>
//         )
//       )}}/>
//     </div>
//   </Router>
// );

// class Form extends React.Component {
//   state = {
//     isBlocking: false
//   };

//   render() {
//     const { isBlocking } = this.state;

//     return (
//       <form
//         onSubmit={event => {
//           event.preventDefault();
//           event.target.reset();
//           this.setState({
//             isBlocking: false
//           });
//         }}
//       >
//         <Prompt
//           when={isBlocking}
//           message={location =>
//             `Are you sure you want to go to ${location.pathname}`
//           }
//         />

//         <p>
//           Blocking?{" "}
//           {isBlocking ? "Yes, click a link or the back button" : "Nope"}
//         </p>

//         <p>
//           <input
//             size="50"
//             placeholder="type something to block transitions"
//             onChange={event => {
//               this.setState({
//                 isBlocking: event.target.value.length > 0
//               });
//             }}
//           />
//         </p>

//         <p>
//           <button>Submit to stop blocking</button>
//         </p>
//       </form>
//     );
//   }
// }

// export default PreventingTransitionsExample;

// import React from "react";
// import PropTypes from 'prop-types'
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
//   Redirect,
//   withRouter
// } from "react-router-dom";

// const NoMatchExample = () => (
//   <Router>
//     <div>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/old-match">Old Match, to be redirected</Link>
//         </li>
//         <li>
//           <Link to="/will-match">Will Match</Link>
//         </li>
//         <li>
//           <Link to="/will-not-match">Will Not Match</Link>
//         </li>
//         <li>
//           <Link to="/also/will/not/match">Also Will Not Match</Link>
//         </li>
//       </ul>
//       <Switch>
//         <Route path="/" exact component={Home} />
//         <Redirect from="/old-match" to="/will-match" />
//         <Route path="/will-match" component={WillMatch} />
//         <Route component={NoMatch} />
//       </Switch>
//       <ShowTheLocationWithRouter/>
//     </div>
//   </Router>
// );

// const Home = () => (
//   <p>
//     A <code>&lt;Switch></code> renders the first child <code>&lt;Route></code>{" "}
//     that matches. A <code>&lt;Route></code> with no <code>path</code> always
//     matches.
//   </p>
// );

// const WillMatch = () => <h3>Matched!</h3>;

// const NoMatch = ({ location }) => (
//   <div>
//     <h3>
//       No match for <code>{location.pathname}</code>
//     </h3>
//   </div>
// );
 

// // 显示当前位置的路径名的简单组件
// class ShowTheLocation extends React.Component {
//   static propTypes = {
//     match: PropTypes.object.isRequired,
//     location: PropTypes.object.isRequired,
//     history: PropTypes.object.isRequired
//   }

//   render() {
//     const { match, location, history } = this.props

//     return (
//       <div>You are now at {location.pathname}</div>
//     )
//   }
// }

// // 创建一个“connected”的新组件（借用Redux 术语）到路由器。

// const ShowTheLocationWithRouter = withRouter(ShowTheLocation)

// export default NoMatchExample;
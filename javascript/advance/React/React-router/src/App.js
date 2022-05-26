import React, { Component } from 'react';
//import { Redirect, Link, Route,Switch } from 'react-router-dom';
import { Redirect, Link, Route, Switch, withRouter, Prompt } from './react-router/packages/react-router-dom/modules';
import Category from './Category';
import Products from './Products';
// import  Login, { fakeAuth }  from './Login';


const App = () => (
  <div>
    <ul>
      <li>
        <Link to="/" replace>Form</Link>
      </li>
      <li>
        <Link to="/one" >One</Link>
      </li>
      <li>
        <Link to="/two" replace>Two</Link>
      </li>
    </ul>
    <Route path="/" exact component={Form} />
    <Route path="/one" render={() => <One />} />
    <Route path="/two" render={() => <h3>Two</h3>} />
  </div>
);

class One extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 1
    }
  }
  add = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <React.Fragment>
      <input type="button" onClick={this.add} value="Add" />
      <label>{this.state.count}</label>
      </React.Fragment>
    )
  }
}
class Form extends React.Component {
  state = {
    isBlocking: false,
    val: 0
  };
  // componentWillReceiveProps() {
  //   console.log('aaa')
  // }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('===================>getDerivedStateFromProps')
    return prevState
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('===================>getSnapshotBeforeUpdate')
    console.log('#enter getSnapshotBeforeUpdate');
    return 'foo';
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('===================>componentDidUpdate')
    console.log('#enter componentDidUpdate snapshot = ', snapshot);
  }
  batchUpdates = () => {
    debugger
    this.setState({ val: this.state.val + 1 })
    this.setState({ val: this.state.val + 1 })
    this.setState({ val: this.state.val + 1 })
  }
  render() {
    console.log('===================>render')
    const { isBlocking, value } = this.state;

    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          event.target.reset();
          this.setState({
            isBlocking: false
          });
        }}
      >
        <Prompt
          when={isBlocking}
          message={location => {
            debugger
            return `Are you sure you want to go to ${location.pathname}`
          }
          }
        />

        <p>
          Blocking?{" "}
          {isBlocking ? "Yes, click a link or the back button" : "Nope"}
        </p>

        <p>
          <input
            size="50"
            placeholder="type something to block transitions"
            onChange={event => {
              this.setState({
                isBlocking: event.target.value.length > 0,
                value: event.target.value
              });
            }}
          />
        </p>
        <p>{value}</p>
        <div onClick={this.batchUpdates}>
          {`Counter is ${this.state.val}`} // 1
        </div>
        <p>
          <button>Submit to stop blocking</button>
        </p>
      </form>
    );
  }
}

export default App;
// class App extends Component {

//   render() {

//     return (
//       <div>
//        <nav className="navbar navbar">     
//         <ul className="nav navbar-nav">
//           <li><Link to="/">Homes</Link></li>
//           <li><Link to="/category">Category</Link></li>
//           <li><Link to="/products">Products</Link></li>
//           <li><Link to="/admin">Admin area</Link></li>
//         </ul>
//        </nav>

//        <Switch>
//         <Route path="/login"  render={(props) => <Login {...props} />} />
//         <Route exact path="/" component={Home}/>
//         <Route path="/category" children={(props) => <Category {...props} />} />
//         <PrivateRoute path='/admin' component = {Admin} />
//         <Route path="/products" component={Products}/>
//        </Switch>
//       </div>
//     );
//   }
// }

// //Private router function
// const PrivateRoute = ({component: Component, ...rest}) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) => fakeAuth.isAuthenticated === true
//         ? <Component {...props} />
//         : <Redirect to={{pathname: '/login', state: {from: props.location}}} />} />
//   )
// }

// //Home component
// const Home = (props) => (
//   <div>
//     <h2>Home {console.log(props)}</h2>
//   </div>
// )

// //Admin component
// const Admin = ({ match }) => {
//   return(<div> <h2>Welcome admin </h2></div>)


// }


// export default  App;
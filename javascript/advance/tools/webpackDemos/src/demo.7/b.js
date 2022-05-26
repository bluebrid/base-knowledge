import React,{Component} from 'react';
import { Route,Link} from 'react-router-dom';
import Loadable from 'react-loadable';

const Loading = (props) => {
  return <div>Loadingc...</div>
};

const D = Loadable({
  loader: () => import('./d.js'),
  loading: Loading,
})
export default class B extends Component{
  render(){
    return <div>
      this is B
      <Route path="/b/c" component={D}/>
      <Link to="/b/c">to C</Link>
    </div>
  }
}

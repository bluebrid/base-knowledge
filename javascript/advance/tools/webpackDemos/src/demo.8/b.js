import React,{Component} from 'react';
import { Route,Link} from 'react-router-dom';
import LazyLoad from './LazyLoad'
const D = LazyLoad(() => import(/* webpackChunkName: "chunckD" */'./d'))
export default class B extends Component{
  render(){
    return <div>
      this is B
      <Route path="/b/c" component={D}/>
      <Link to="/b/c">to C</Link>
    </div>
  }
}

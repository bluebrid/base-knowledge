import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import RouteWithSubRoutes from './router/utils'
export default ({routes}) => (
<div>
      this is B
      <Link to="/b/c">to C</Link>
      {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </div>
)

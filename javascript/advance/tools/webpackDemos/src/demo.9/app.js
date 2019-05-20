import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter  as Router, Route, Switch, Link } from 'react-router-dom'
import routers from './router'
import RouteWithSubRoutes from './router/utils'
/**
 * 对routes 进行封装配置
 */
 
export default class App extends Component {
    render() {
        return <div>
            <Router>
                <div>
                    <Link to='/a'> to A</Link><br />
                    <Link to='/b'> to B</Link>
                    {routers.map((route, i) => <RouteWithSubRoutes key ={i} {...route}/>)}
                </div>
            </Router>
        </div>
    }
}

ReactDOM.render(<App />, document.querySelector('#app'))

if (module.hot) {
    module.hot.accept()
}
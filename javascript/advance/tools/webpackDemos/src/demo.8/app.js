import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter  as Router, Route, Switch, Link } from 'react-router-dom'
import LazyLoad from './LazyLoad'
/**
 * 封装一个按需加载的组件
 */
 
const A = LazyLoad(() => import(/* webpackChunkName: "chunckA" */'./a'))
const B = LazyLoad(() => import(/* webpackChunkName: "chunckB" */'./b'))
export default class App extends Component {
    render() {
        return <div>
            <Router>
                <div>
                    <Switch>
                        <Route path='/a' component={A} />
                        <Route path='/b' component={B} />
                    </Switch>
                    <Link to='/a'> to A</Link><br />
                    <Link to='/b'> to B</Link>

                </div>
            </Router>
        </div>
    }
}

ReactDOM.render(<App />, document.querySelector('#app'))

if (module.hot) {
    module.hot.accept()
}
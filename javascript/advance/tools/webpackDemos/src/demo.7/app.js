import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter  as Router, Route, Switch, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
const Loading = () => <div>Loading...</div>
const A = Loadable({
    loader: () => import(/* webpackChunkName: "chunckA" */'./a'),
    loading: Loading
})

const B = Loadable({
    loader: () => import(/* webpackChunkName: "chunckB" */'./B'),
    loading: Loading
})

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
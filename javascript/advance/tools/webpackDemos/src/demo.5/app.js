import React , {Component} from 'react'
import ReactDOM from 'react-dom'
import A from './a'
export default class App extends Component {
    render() {
        return <div>
            This is APP.
            <A/>
        </div>
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'))

if (module.hot) {
    module.hot.accept()
}
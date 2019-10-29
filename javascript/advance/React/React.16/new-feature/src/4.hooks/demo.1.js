import React from 'react'

class Demo1 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    clickBtn = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={this.clickBtn}>
                    Click me(Class Component setState)
                </button>
            </div>
        )
    }
}

export default Demo1
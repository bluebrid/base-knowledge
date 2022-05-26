import React from 'react'

const TextInput = React.forwardRef((props, ref) => (
    <input type="text" placeholder="Hello forwardRef" ref={ref} />
))

// const inputRef = React.createRef()

class Demo1 extends React.Component {
    constructor(props) {
        super(props)
        this.myRef = React.createRef()
    }

    handleSubmit = event => {
        event.preventDefault()

        alert('input value is:' + this.myRef.current.value)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* <TextInput ref={this.myRef} /> */}
                <input type="text" placeholder="Hello forwardRef" ref={this.myRef} />
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default Demo1
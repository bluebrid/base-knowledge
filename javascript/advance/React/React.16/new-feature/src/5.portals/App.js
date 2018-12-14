import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './App.scss'
class Modal extends React.Component {
    render() {
        const node = document.getElementById('modal');
        return ReactDOM.createPortal(this.props.children, node);
    }
}
function Button(props) {
    return (
        <input type='button' onClick={props.click} value={props.textValue} />
    )
}
function App() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button click={() => setOpen(!open)} textValue={'open'} />
            <div className='content'>  Content </div>
            {
                open ? <Modal >
                     <div className='modal-content'>
                        <div>This is Pop-up text</div>
                        <Button click={() => setOpen(!open)} textValue='close' />
                     </div>
                  
                    </Modal> : null        
            }
        </>

    )

}

export default App

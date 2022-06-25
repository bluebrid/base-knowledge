import React, {useState} from 'react'
const InputDemo = () => {
    const [inputValue ,setInputValue] = useState(0)
    const onClick = () => {
        setInputValue(inputValue + 1)
    }
    return <>
    <button onClick={onClick} key="1">
          Add 
        </button>
        <input disabled key="2" value={inputValue} />
    </>
}

export default InputDemo
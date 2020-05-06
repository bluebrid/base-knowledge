import React, {useState, useRef, useLayoutEffect} from 'react'

const Foo = ({text}) => {
    const [width, setWidth] = useState()
    const root = useRef(null)
    useLayoutEffect( () => {
        root.current && setWidth(root.current.offsetWidth)
    }, [])
    return <span ref={root}> {text}- {width}</span>
}

export default Foo
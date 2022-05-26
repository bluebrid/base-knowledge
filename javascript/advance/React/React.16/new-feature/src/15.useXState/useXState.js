import { useEffect, useRef, useState } from 'react'

const useXState = (initState) => {
    const [state, setState] = useState(initState)
    let isUpdate = useRef()
    const setXState = (state, cb) => {
        setState(prev => {
            isUpdate.current = cb
            return typeof state === 'function' ? state(prev) : state
        })
    }
    useEffect(() => {
        if (isUpdate.current) {
            isUpdate.current()
        }
    })

    return [state, setXState]
}

export default useXState

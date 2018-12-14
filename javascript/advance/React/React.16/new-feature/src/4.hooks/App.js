/**
 * https://juejin.im/post/5be409696fb9a049b13db042
 */
import React from 'react'
import Demo1 from './demo.1'
import Demo2 from './demo.2'
import WindowWidth from './demo.3'
import WindowWidth2 from './demo.4'
class App extends React.Component {
    render () {
        return (
            <>
                <Demo1 />
                <Demo2 />
                <WindowWidth />
                <WindowWidth2 />
            </>
        )
    }
}
export default App
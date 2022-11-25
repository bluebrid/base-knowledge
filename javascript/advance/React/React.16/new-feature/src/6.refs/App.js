/**
 * https://juejin.im/post/5be409696fb9a049b13db042
 * https://juejin.cn/post/7166224289383841823?share_token=bac34d68-cbe2-49cb-b49c-64c7448c66be
 */
import React from 'react'
import Demo1 from './demo.1'
import Demo2 from './demo.2'
import Demo3 from './demo.3'
import Demo4 from './demo.4'
class App extends React.Component {
    render () {
        return (
            <div className="section" data-title="6 refs">
                {/* <Demo1 />
                <Demo2 text="useRef" />
                <Demo3 /> */}
                <Demo4 />
            </div>
        )
    }
}
export default App
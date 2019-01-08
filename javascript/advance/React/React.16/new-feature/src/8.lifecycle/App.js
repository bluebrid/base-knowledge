import React, { Component, useState, useEffect } from 'react'
import './App.scss'
/**
 * https://mp.weixin.qq.com/s?__biz=MjM5NTg2NTU0Ng==&mid=2656599641&idx=2&sn=3e69bed43a9b6c2b73c6228fbc8024e2&chksm=bd5d28fc8a2aa1eacf8c81191717a5f7f89f453ac7f8d058a19840a213621452f5ca2433bfe1&scene=0#rd
 * https://zhuanlan.zhihu.com/p/38030418?utm_source=wechat_session&utm_medium=social 
 * https://blog.csdn.net/Napoleonxxx/article/details/81120854
 */
function log(name, background = '#222', color = '#bada55') {
    console.log(`%c[=======================>${name}]`, `background: ${background}; color: ${color}`)
}

const COLORS = {
    MOUNTING: 'yellow',
    UPDATING: 'green',
    UNMOUNTING: 'red'
}

function App() {
    const [count, setCount] = useState(0)
    return (
        <>
            <input type="number" onChange={() => setCount(+document.getElementById('input').value)}  id="input"/>
            <Container count={count}/>
        </>
    )
}


class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: this.props.count,
            updateByState: false
        }

    }

    setStateClick = () => {
        this.setState({
            count: this.state.count + 1,
            updateByState: true
        })
    }

    forceUpdateClick = () => {
        this.forceUpdate()
    }

    static getDerivedStateFromProps(nextProps, preState) {
        /**
         * 这个方法在建议尽量少用，只在必要的场景中使用，一般使用场景如下：
           1. 无条件的根据 props 更新 state
           2. 当 props 和 state 的不匹配情况更新 state
           getDerivedStateFromProps exists for only one purpose. It enables a component to update its internal state as the result of changes in props.
         */
        log(`getDerivedStateFromProps`)
        if (nextProps.count !== preState.count) {
            return {
                count: preState.updateByState ? preState.count : nextProps.count, // 因为同时存在通过setState 和props 去更新state, 所以需要去判断到底是哪个在更新状态， 所以其实更适用与state只根据props 来更新的情况
                updateByState: false
            }
        }
        return null
    }

    /*
    UNSAFE_componentWillMount() {
        log('UNSAFE_componentWillMount', 'red')
    }
    */
    render() {
        log('render')
        return (
            <>
                <input type='button' onClick={this.setStateClick} value='Set State' />
                <input type='button' onClick={this.forceUpdateClick} value='Force Update' />
                Count: {this.state.count}
            </>)
    }

    componentDidMount() {
        log('componentDidMount', COLORS.MOUNTING)
    }
    /*
    UNSAFE_componentWillReceiveProps(nextProps, preState) {
        log('UNSAFE_componentWillReceiveProps')
    }
    */
    shouldComponentUpdate(nextProps, nextState, nextContent) {
        log('shouldComponentUpdate', COLORS.UPDATING)
        // if (nextProps.count === nextState.count) {
        //     return false;
        // }
        return true
    }
    /*
    UNSAFE_componentWillUpdate(nextProps, nextState, nextContent) {
        log('UNSAFE_componentWillUpdate')
    }
    */
    getSnapshotBeforeUpdate(preProps, preState) {
        /**
         * React v16.3还引入了一个新的声明周期函数getSnapshotBeforeUpdate，
         * 这函数会在render之后执行，而执行之时DOM元素还没有被更新，给了一个机会去获取DOM信息，
         * 计算得到一个snapshot，这个snapshot会作为componentDidUpdate的第三个参数传入。
         * 官方给了一个例子，用getSnapshotBeforeUpdate来处理scroll，
         * 坦白说，我也想不出其他更常用更好懂的需要getSnapshotBeforeUpdate的例子，
         * 这个函数应该大部分开发者都用不上（听得懂我的潜台词吗：不要用！)
         * getSnapshotBeforeUpdate 是在render之后触发，它的要点在于触发时，Dom还没有更新，开发者可以做一些事情，返回值会作为第三个参数传递给接下来将要触发的componentDidUpdate。
         */
        log('getSnapshotBeforeUpdate', COLORS.UPDATING)
        return 'snap value .'
    }
    componentDidUpdate(preProps, preState, snap) {
        log('componentDidUpdate', COLORS.UPDATING)
        log('componentDidUpdate Snap Value: ' + snap, COLORS.UNMOUNTING)
    }
    componentWillUnmount() {
        log('componentWillUnmount', COLORS.UNMOUNTING)
    }
}
console.log(<Container />)
export default App
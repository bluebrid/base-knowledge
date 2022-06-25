import React from 'react'

let states = []
let setters = []
let firstRun = true
let cursor = 0

//  使用工厂模式生成一个 createSetter，通过 cursor 指定指向的是哪个 state
function createSetter(cursor) {
    return function (newVal) { // 闭包
        states[cursor] = newVal
    }
}

function useState(initVal) {
    // 首次
    if (firstRun) {
        states.push(initVal)
        setters.push(createSetter(cursor))
        firstRun = false
    }
    let state = states[cursor]
    let setter = setters[cursor]
    // 光标移动到下一个位置
    cursor++
    // 返回
    return [state, setter]
}

function Demo1() {
    // 每次重置 cursor
    cursor = 0
    return <RenderFunctionComponent />
}
function RenderFunctionComponent() {
    const [firstName, setFirstName] = useState("Rudi");
    const [lastName, setLastName] = useState("Yardley");

    return (
        <button onClick={() => setFirstName("Fred")}>
            Click me(Class Component setState)
        </button>
    );
}
export default Demo1
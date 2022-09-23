import { combineReducers , createStore  } from 'redux'
import {useSyncExternalStore} from 'react'
import './App.scss'
/* number Reducer */
function numberReducer(state=1,action){
    switch (action.type){
      case 'ADD':
        return state + 1
      case 'DEL':
        return state - 1
      default:
        return state
    }
}

/* 注册reducer */
const rootReducer = combineReducers({ number:numberReducer  })
/* 创建 store */
const store = createStore(rootReducer,{ number:1  })

export default function App(){
    /* 订阅外部数据源 */
    // https://juejin.cn/post/7118937685653192735?share_token=b06ac11f-deff-4304-b8d3-eff06d9a5302#heading-7
    const state = useSyncExternalStore(store.subscribe,() => store.getState().number)
    console.log(state)
    return <div className="section " data-title="18 useSyncExternalStore">
        <span>{state} </span>
        <button onClick={() => store.dispatch({ type:'ADD' })} >Add</button>
        <button onClick={() => store.dispatch({ type:'DEL' })} >Del</button>
    </div>
}
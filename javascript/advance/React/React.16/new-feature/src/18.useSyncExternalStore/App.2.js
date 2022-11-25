import {useSyncExternalStore} from 'react';
//自定义一个store
const store = {
    currentState:{data:0},
    listeners:new Set(),
    reducer(action){
        switch(action.type) {
            case 'ADD':
                return {data:store.currentState.data+1}
            default:
                return store.state
        }
    },
    subscribe(callback){
        store.listeners.add(callback);
        console.log('后出发')
        return () => {
            console.log('先出发');
          store.listeners.delete(callback);
        }
    },
    getSnapshot() {
        return store.currentState
    },
    dispatch(action) {
        store.currentState = store.reducer(action)
        store.listeners.forEach(l=>l())
        return action;
    }
}

// export default store

//触发订阅、更新

// import store from '../store/reducer'

function Demo() {
    const state = useSyncExternalStore(store.subscribe, ()=>store.getSnapshot().data);
    
    return <div  className="section" data-title="18.2 useSyncExternalStore">
        <div>count:{state}</div>
        <div>
            <button onClick={()=>store.dispatch({type:'ADD'})}>add+</button>
        </div>
    </div>
}
export default Demo

import { fromEvent } from '../esm2015';
import { throttleTime, scan, mapTo } from '../esm2015/operators'

export default function fromEventDemo() {
    const addBtn = document.getElementById('add')
    const minusBtn = document.getElementById('minus')
    const nameInput = document.getElementById('name')
    
    // 返回一个Observable 对象
    let addFromEventObj = fromEvent(addBtn, 'click')
    addFromEventObj = addFromEventObj.pipe(
        // throttleTime(1000 * 2), 
        // mapTo(1), 
        // scan((init, next) => init + next, 1)
        scan(count => count + 1, 0)
    )
    
    const subscriber1 = value => {
        nameInput.value = value
        if (value > 10) {
            // 注销订阅
            // addFromEventObj.unsubscribe();
        }
    }
    const subscriber2 = value => {
       console.log('subscriber2:' ,value)
    }
   const  unsubscribe1 = addFromEventObj.subscribe(subscriber1)
   const  unsubscribe2 = addFromEventObj.subscribe(subscriber2)
}

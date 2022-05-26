/**
 * 自定义Hooks, 其实就是将hooks 的代码抽离出来
 */

 import React , {useState, useEffect} from 'react'

 function useWidndowWidth () {
     const [width, setWidth] = useState(window.innerWidth)
     useEffect(
         () => {
            const handleResize = () => {
                setWidth(window.innerWidth)
            }
            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize)
            }
         },
         [width]
     )
     return width
 }

 function WindowWidth2() {
     const width = useWidndowWidth()
     return (
        <p>当前窗口的宽度是 {width}</p> 
     )
 }
 export default WindowWidth2
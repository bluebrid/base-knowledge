import React, { useState, useEffect } from 'react'

/**
 * useEffect 相当于是监听useState 的值的改变后要处理的事件
 */
function WindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(
    () => {
      console.log('===============>', width)
      const handleResize = () => {
        setWidth(window.innerWidth)
      }
      window.addEventListener('resize', handleResize)
      return () => { // 返回一个函数来进行取消事件监听
        window.removeEventListener('resize', handleResize)
      }
    },
    [width]
  )
  return (
    <p> window width is {width}</p>
  )
}
export default WindowWidth
import React, { useState, useCallback, useRef, useLayoutEffect } from 'react';
import Search from './search';
import Detail from './detail'
let Home = () => {
  console.log('Demo3: Home Component 被渲染了')
  const [searchId, setSearchId] = useState(0)
  const ref = useRef()

  useLayoutEffect(() => {
    ref.current = searchId
  }, [searchId])

  const handleSearchIdChange = (e) => {
    console.log('Demo3: handleSearchChange 被执行了')
    setSearchId(e.target.value)
  };

  const handleSearchIdChange1 = useCallback((e) => {
    console.log('Demo3: handleSearchChange 被执行了')
    setSearchId(e.target.value)
  }, [ref])

  return (
    <>
      <Search handleSearchId={handleSearchIdChange1} />
      <Detail />
    </>
  )
}

export default Home
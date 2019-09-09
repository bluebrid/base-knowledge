import React, { useState } from 'react';
import Search from './search';
import Detail from './detail'
let Home = () => {
  console.log('Demo2: Home Component 被渲染了')
  const [searchId, setSearchId] = useState(0)

  const handleSearchIdChange = (e) => {
    console.log('Demo2: handleSearchChange 被执行了')
    setSearchId(e.target.value)
  }

  return (
    <>
      <Search handleSearchId={handleSearchIdChange} />
      <Detail />
    </>
  )
}

export default Home
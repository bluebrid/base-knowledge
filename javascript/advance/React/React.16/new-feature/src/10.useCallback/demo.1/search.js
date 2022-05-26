import React from 'react';
let Search = (props) => {
  const { handleSearchId } = props
  console.log('Demo1: Search Component 被渲染了')
  return (
    <>
      <input onChange={(e) => { handleSearchId(e) }} />
    </>
  )
}

export default Search
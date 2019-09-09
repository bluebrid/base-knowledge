import React, {memo} from 'react';
let Search = memo((props) => {
  const { handleSearchId } = props
  console.log('Demo3: Search Component 被渲染了')
  return (
    <>
      <input onChange={(e) => { handleSearchId(e) }} />
    </>
  )
})

export default Search
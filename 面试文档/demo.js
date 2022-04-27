setTimeout(()=>{
    console.log('timeout')
    process.nextTick(()=>{
        console.log('timeout next tick')
      })
  })
  setImmediate(()=>{
    console.log('immediate')
  })
  process.nextTick(()=>{
    console.log('next tick')
  })
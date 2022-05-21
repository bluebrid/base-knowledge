/**
 * 
 * @param {*} cb 
 * @param {*} timeSpan 
 */
const myInterval = (cb, timeSpan = 1000) => {
  let stop = false
  let timerId
  const helper = () => {
    timerId = setTimeout(() => {
      if (!stop) {
        cb()
        helper()
      } else {
        clearTimeout(timerId)
      }
    }, timeSpan)
  }
  helper();
  return {
    clear: () => {
      stop = true;
    }
  }
}

let result = 0
const intervalObj = myInterval(() => {
  result++;
  if (result > 5) {
    intervalObj.clear()
    return
  }
  console.log('=================', result)
}, 2000)
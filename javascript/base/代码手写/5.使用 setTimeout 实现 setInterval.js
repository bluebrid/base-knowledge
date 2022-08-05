<<<<<<< HEAD
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
=======
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
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
}, 2000)
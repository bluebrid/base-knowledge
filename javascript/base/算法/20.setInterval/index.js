const isFunc = (func) => Object.prototype.toString.call(func) === '[object Function]'
const isNumber = (val) => Object.prototype.toString.call(val) === '[object Number]'
const customSetInterval = (handler, timeSpan = 1000) => {
  if (!isFunc(handler)) {
    throw Error('handler should be a Function.')
  }
  if (!isNumber(timeSpan)) {
    throw Error('timeSpan should be a Number')
  }
  let isStop = false
  let timeoutID;

  const loop = async () => {
    await new Promise((resolve, reject) => {
      timeoutID = setTimeout(() => {
        handler();
        resolve(true)
      }, timeSpan)
    })
    if (!isStop) {
      await loop()
    }
  }
  loop();
  return {
    handlerId: timeoutID,
    clearInterval: () => {
      isStop = true;
      clearTimeout()
    }
  }
}


let count = 0;
const res = customSetInterval(() => {
  count++
  stop(count)
  console.log('==============', count)
}, 1000)

const stop = (maxCount) => {
  if (maxCount >= 10) {
    res.clearInterval()
  }
}



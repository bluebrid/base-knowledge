
const result = {}
const isFunc = (callback) => Object.prototype.toString.call(callback) === '[object Function]'
const toArray = (a) => Array.isArray(a) ? a : [a]
// Memo 是用来缓存结果的
const useMemo = (callback, deps) => {
  if (isFunc) {
    const funcName = callback.name
    const args = toArray(deps).join('.')
    const memoName = `${funcName}-${args}`
    if (result[memoName]) {
      return result[memoName]
    } else {
      result[memoName] = callback(...toArray(deps))
      return result[memoName]
    }
  } else {
    throw Error('callback should be function.')
  }
}
const func1 = (x) => {
  let result = 0
  for (let i = 0; i < x; i++) {
    result += i
  }
  return result
}
const func2 = (x) => {
  let result = 0
  for (let i = 0; i < x; i++) {
    result += i
  }
  return result
}

const startTime = Date.now()
const res = useMemo(func1, [11900000])
const endTime = Date.now()
console.log(res)
console.log('--------------------', endTime- startTime)
const startTime1 = Date.now()
const res1 = useMemo(func1, [11900000])
const endTime1 = Date.now()
console.log(res1)
console.log('--------------------', endTime1- startTime1)

const startTime2 = Date.now()
const res2 = useMemo(func2, [11900000])
const endTime2 = Date.now()
console.log(res2)
console.log('--------------------', endTime2- startTime2)
const startTime3 = Date.now()
const res3 = useMemo(func1, [11900000])
const endTime3 = Date.now()
console.log(res3)
console.log('--------------------', endTime3- startTime3)
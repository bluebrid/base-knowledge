// 是用来缓存函数的应用的
let memoMap = new Map();
const toArray = (a) => Array.isArray(a) ? a : [a]
const useCallback = (callback, deps) => {
  const funcName = callback.name;
  const itemName = `${callback.name}-${toArray(deps).join('.')}`
  if (memoMap.get(itemName)) {
    return memoMap.get(itemName)
  } else {
    let isExistFunc = false;
    memoMap.forEach((item, key) => {
      const regx = new RegExp(`^${funcName}`)
      if (regx.test(key)) {
        isExistFunc = true;
      }
    })
    if (isExistFunc) {
      memoMap.set(itemName, callback.bind({}))
    } else {
      memoMap.set(itemName, callback)
    }

    return memoMap.get(itemName)
  }
}

const func1 = function () {
  console.log('func1')
}

const func2 = function () {
  console.log('func2')
}

const cb1 = useCallback(func1, [1])
const cb2 = useCallback(func1, [1])
console.log(cb1)
console.log(cb2)
console.log(cb1 === cb2)

const cb3 = useCallback(func1, [2])
const cb4 = useCallback(func1, [1])
console.log(cb3)
console.log(cb4)
console.log(cb3 === cb4)

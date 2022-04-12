
const isFunc = (func) => Object.prototype.toString.call(func) === '[object Function]'
const isProxyObj = (val) => Object.prototype.toString.call(val) === '[object Proxy-Object]'
const wrapProxyObj = (target, handler) => {
  const __proxyHandler__ = '__proxyHandler__'
  if (!isFunc(handler)) {
    throw Error('handler should be a funcion.')
  }
  if (isProxyObj(target)) {
    if (target[__proxyHandler__]) {
      target[__proxyHandler__].push(handler)
    } else {
      target[__proxyHandler__] = [handler]
    }
    return target
  }
  target = new Proxy(target, {
    get(target, propKey, receiver) {
      return Reflect.get(target, propKey, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      if (key !== __proxyHandler__) {
        const __pHandler__ = target[__proxyHandler__] || []
        __pHandler__.forEach((func) => {
          func(target)
        });
      }
      return result
    }
  })
  target[Symbol.toStringTag] = 'Proxy-Object'
  target.__proxyHandler__ = [handler]
  return target;
}

let obj = {
  a: 1,
  b: 2
}
const func1 = () => {
  console.log('func1:',obj.a)
}
const func2 = () => {
  console.log('func2:', obj.a)
}
obj = wrapProxyObj(obj, func1)
obj = wrapProxyObj(obj, func2)
obj = wrapProxyObj(obj, func2)
obj.a = 5;
obj.a = obj.a + 10
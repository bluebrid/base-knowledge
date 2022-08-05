<<<<<<< HEAD
const proxyObject = (obj) => {
  const proxyObj = new Proxy(obj, {
    get(target, key, receiver) {
      return {
        key,
        value: Reflect.get(target, key, receiver)
      }
    },
    set(target, key, value, receiver) {
      const result =  Reflect.set(target, key, value, receiver)
      const {__handler__ = []} = target
      __handler__.forEach(func => {
        func(target)
      });
      return result
    }
  })

  return proxyObj;
}


const proxyObj = proxyObject({
  a: 1,
  b: 2
})
const func1 = () => {
  console.log('func1:',proxyObj.a)
}
const func2 = () => {
  console.log('func2:', proxyObj.a)
}
const observerFunction = (func) => {
  
=======
const proxyObject = (obj) => {
  const proxyObj = new Proxy(obj, {
    get(target, key, receiver) {
      return {
        key,
        value: Reflect.get(target, key, receiver)
      }
    },
    set(target, key, value, receiver) {
      const result =  Reflect.set(target, key, value, receiver)
      const {__handler__ = []} = target
      __handler__.forEach(func => {
        func(target)
      });
      return result
    }
  })

  return proxyObj;
}


const proxyObj = proxyObject({
  a: 1,
  b: 2
})
const func1 = () => {
  console.log('func1:',proxyObj.a)
}
const func2 = () => {
  console.log('func2:', proxyObj.a)
}
const observerFunction = (func) => {
  
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
}
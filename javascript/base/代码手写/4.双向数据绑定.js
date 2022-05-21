
const originObj = {
  name: 'ivan',
  age: 18
}
class MyProxy {
  constructor(obj) {
    this.obj = obj
    this.deps = {}
  }
  reactive(key, cb) {
    return this.proxyFunc(key, cb)
  }
  proxyFunc(key, cb) {
    const deps = this.deps
    this.proxyObj = new Proxy(originObj, {
      get(target, key, receiver) {
        deps[key] = deps[key] || []
        deps[key].push(cb)
        return target[key]
      },
      set(target, key, value, receiver) {
        target[key] = value;
        if (deps[key]?.length) {
          deps[key].forEach(dep => {
            dep?.()
          });
        }
        return Reflect.set(target,key,receiver)
      }
    })
    return this.proxyObj[key]
  }

}
function ProxyFunc(originObj) {
  let deps = {}
  return new Proxy(originObj, {
    get(target, key, receiver) {
      const callerFunc = arguments
      deps[key] = deps[key] || []
      deps[key].push(callerFunc)
      return target[key]
    },
    set(target, key, value, receiver) {
      target[key] = value;
      if (deps[key]?.length) {
        deps[key].forEach(dep => {
          dep?.()
        });
      }
    }
  })
}

const obj = new MyProxy(originObj)

const subNameFunc = () => {
  console.log(obj.reactive('name', subNameFunc))
}
const subAgeFunc = () => {
  console.log(obj.reactive('age', subAgeFunc))
}
const subAllFunc = () => {
  console.log(obj.reactive('age', subAllFunc))
  console.log(obj.reactive('name', subAllFunc))
}
subNameFunc();
subAgeFunc();
subAllFunc()
obj.proxyObj.age = 22;
obj.proxyObj.name = 'jack';
obj.proxyObj.name = 'jack1';

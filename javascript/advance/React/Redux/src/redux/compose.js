export default function compose(...funcs) {
  console.log('compose middleware length: ' + funcs.length)
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  // return funcs.reduce((a, b) => (...args) => a(b(...args)))
  return funcs.reduce((a, b) => {
    return (...args) => {
      console.log(args)
      // args 传入的是: dispatch, 从applyMiddleware 传入
      const bR = b(...args)
      console.log(bR)
      return a(bR)
      // return a(b(...args))
    }
  })
}

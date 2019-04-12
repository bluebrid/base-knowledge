const target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {}
const devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__

export default function devtoolPlugin (store) {
  if (!devtoolHook) return

  store._devtoolHook = devtoolHook

  devtoolHook.emit('vuex:init', store)

  /**
   * window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('vuex:travel-to-state', {"cart":{"items":[{"id":1,"quantity":2}],"checkoutStatus":null},"products":{"all":[{"id":1,"title":"iPad 4 Mini","price":500.01,"inventory":1},{"id":2,"title":"H&M T-Shirt White","price":10.99,"inventory":10},{"id":3,"title":"Charli XCX - Sucker CD","price":19.99,"inventory":5}]}})
   */
  devtoolHook.on('vuex:travel-to-state', targetState => {
    store.replaceState(targetState)
  })

  store.subscribe((mutation, state) => {
    devtoolHook.emit('vuex:mutation', mutation, state)
  })
}

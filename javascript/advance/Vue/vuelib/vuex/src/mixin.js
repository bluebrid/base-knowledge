export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.log({
        context: `1. 利用Vue的mixin 添加一个生命周期beforeCreate, 在初始化Vue 实例的时候也会执行这个方法\n
                  2. 给Vue实例添加$store 属性，这个属性来源与我们在初始化Vue 实例的时候，传递给Vue 的store\n
                  3. store可以是一个Object 或者是一个function\n
                  4. 在App.js 中初始化Vue 实例的时候，传递了store属性，如：
                  new Vue({
                    el: '#app',
                    store,
                    render: h => h(App)
                  })
                  所以可以在this.options中可以访问，如： this.options.store,然后将这个属性直接挂载Vue 的实例上this.$store上面
        `,
        showLog: true
      })
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}

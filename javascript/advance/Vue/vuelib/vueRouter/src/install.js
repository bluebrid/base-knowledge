import View from './components/view'
import Link from './components/link'

export let _Vue

export function install (Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal)
    }
  }

  Vue.mixin({
    beforeCreate () {     
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        /**
         * 1. Vue在初始化的时候， 会将传入的所有的对象参数都挂载在this.$options上
         * 2. this.$options.router 是我们在创建Vue示例的时候传递进入的
         * 3. 我们在初始化Vue的时候，必须传递router参数，而且参数名称必须是router
          new Vue({
            router,
            beforeCreate: function (...args) {
              this.log('App beforeCreate')
            }
            }).$mount('#app')
            
         */
        // Vue实例可以直接通过this._router访问this.$options.router
        this._router = this.$options.router;
        /**
         * 1. 我们在app.js 中初始化了VueRouter对象，传递了一个对象参数, mode默认值是hash, 也就是初始化了HashHistory， 也就是`./history/hash` 定义的对象
         * 2. 执行init方法,在init 方法中最主要是执行了history.listen，去监听route的变化， 然后去变更对应的Vue实例的`_route`属性
         * 3. 我们在下面执行了`Vue.util.defineReactive(this, '_route', this._router.history.current)`, 让Vue实例的`_route`属性变成可观察对象
         * 4. 所以我们的路由如果发送了变化,也就是`_route`发送了变化，Vue就会观察到，然后去渲染相应的组件
         */
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed () {
      registerInstance(this)
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get () { return this._routerRoot._router }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () { return this._routerRoot._route }
  })
  // 定义了Vue中的两个全局组件router-view, router-link
  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}

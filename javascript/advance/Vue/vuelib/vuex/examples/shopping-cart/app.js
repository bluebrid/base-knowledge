import 'babel-polyfill'
import Vue from '../../../vue/dist/vue'
import App from './components/App.vue'
import store from './store'
import { currency } from './currency'

Vue.filter('currency', currency)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})

// 返回一个方法，用来解除订阅
let unSubscribeAction = store.subscribeAction({
  before (action, state) {
    // console.log('=========>action before', action)
  },
  after (action, state) {
    // console.log('=========>action after', action)
  }
})
/**
 * 1.logger.js 插件就是根据这个方法subscribe来实现的
 * 2.devtool.js 也是同样的原理
 */
let unSubscribeMutation = store.subscribe((mutation, state) => {
  // console.log('=========>mutation before', mutation)
})
// console.log(unSubscribe)
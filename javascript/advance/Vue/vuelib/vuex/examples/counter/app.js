import 'babel-polyfill'
import Vue from '../../../vue/dist/vue'
import Counter from './Counter.vue'
import store from './store'

new Vue({
  el: '#app',
  store,
  render: h => h(Counter)
})

import Vue from '../../../vue/dist/vue'
import store from './store'
import CounterControls from './CounterControls.vue'

new Vue({
  el: '#app',
  store,
  render: h => h(CounterControls)
})

// import Vue from 'vue'
import Vue from '../../../../vue/dist/vue'
// import Vuex from 'vuex'

import Vuex from '../../../dist/vuex.common'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import createLogger from '../../../src/plugins/logger'

Vue.log({
  context: '注册Vuex插件',
  showLog: true
})
Vue.use(Vuex)

const state = {
  currentThreadID: null,
  threads: {
    /*
    id: {
      id,
      name,
      messages: [...ids],
      lastMessage
    }
    */
  },
  messages: {
    /*
    id: {
      id,
      threadId,
      threadName,
      authorName,
      text,
      timestamp,
      isRead
    }
    */
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
})

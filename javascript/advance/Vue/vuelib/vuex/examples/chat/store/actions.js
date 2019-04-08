import * as api from '../api'
// import Vue from 'vue'
import Vue from '../../../../vue/dist/vue'

export const getAllMessages = ({ commit }) => {
  api.getAllMessages(messages => {
    commit('receiveAll', messages)
  })
}

export const sendMessage = ({ commit, state }, payload) => {
  api.createMessage(payload, message => {
    // add a `isRead` field before adding the message
    message.isRead = message.threadID === state.currentThreadID
    // add it to the thread it belongs to
    const thread = state.threads[message.threadID]
    if (!thread.messages.some(id => id === message.id)) {
      thread.messages.push(message.id)
      thread.lastMessage = message
    }
    // add it to the messages map
    Vue.set(state.messages, message.id, message)

    // commit('receiveMessage', message)
  })
}

export const switchThread = ({ commit }, payload) => {
  commit('switchThread', payload)
}

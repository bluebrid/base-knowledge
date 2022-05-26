export default {
  addTodo({ commit, state }, text) {
    return Promise.resolve({
      text,
      done: false
    }).then((data) => {
      commit('addTodo', data);
    });
    // state.todos.push({
    //   text,
    //   done: false
    // })
    // setTimeout(() => {
    //   commit('addTodo', {
    //     text,
    //     done: false
    //   })
    // }, 1000 * 2)
    // commit('addTodo', {
    //   text,
    //   done: false
    // });
  },

  removeTodo({ commit }, todo) {
    commit('removeTodo', todo)
  },

  toggleTodo({ commit }, todo) {
    commit('editTodo', { todo, done: !todo.done })
  },

  editTodo({ commit }, { todo, value }) {
    commit('editTodo', { todo, text: value })
  },

  toggleAll({ state, commit }, done) {
    state.todos.forEach((todo) => {
      commit('editTodo', { todo, done })
    })
  },

  clearCompleted({ state, commit }) {
    state.todos.filter(todo => todo.done)
      .forEach(todo => {
        commit('removeTodo', todo)
      })
  }
}

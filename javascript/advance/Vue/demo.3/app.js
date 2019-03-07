 
function log(name, background = '#222', color = '#bada55') {
  console.log(`%c[=======================>${name}]`, `background: ${background}; color: ${color}`)
}
// app Vue instance
var app = new Vue({
  data: {
    newTodo: '',
  },

  // watch todos change for localStorage persistence
  watch: {
    newTodo: {
      handler: function (newTodo) {
        console.log(newTodo);
      },
      sync: false,
      before: function () {

      }
    }
  },
  methods: {
    log: function (name, background = '#FFF', color = '#000') {
      log(name, background, color)
    }
  }
})
// mount
app.$mount('.todoapp')

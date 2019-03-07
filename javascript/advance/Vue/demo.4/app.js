
function log(name, background = '#222', color = '#bada55') {
  console.log(`%c[=======================>${name}]`, `background: ${background}; color: ${color}`)
}
// app Vue instance
var app = new Vue({
  data: {
    newTodo: '',
  },
  // watch: {
  //   strLen: {
  //     handler: function (newVal, oldVal) {
  //       console.log(newVal, oldVal)
  //     }
  //   }
  // },
  computed: {
    strLen: function () {
      console.log(this.newTodo.length)
      return this.newTodo.length
    },
    // strLen: {
    //   get: function () {
    //     console.log(this.newTodo.length)
    //     return this.newTodo.length
    //   }
    // }
  },
  methods: {
    log: function (name, background = '#FFF', color = '#000') {
      log(name, background, color)
    }
  }
})
// mount
app.$mount('.todoapp')

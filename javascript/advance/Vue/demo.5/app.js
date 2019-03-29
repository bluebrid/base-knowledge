
function log(name, background = '#222', color = '#bada55') {
  console.log(`%c[=======================>${name}]`, `background: ${background}; color: ${color}`)
}
// app Vue instance
var app = new Vue({
  data: {
    newTodo: '',
  },
  methods: {
    log: function (name, background = '#FFF', color = '#000') {
      log(name, background, color)
    }
  },
  render01: function (createElement) {
    var self = this
    return createElement('input', {
      domProps: {
        value: self.newTodo,
        placeholder: 'What needs to be done?',
        autocomplete: 'off',
        autofocus: true       
      },
      staticClass: 'new-todo',      
      on: {
        input: function (event) {
          self.$emit('input', event.target.value)
          console.log(event.target.value)
        },
        focus:function (event) {
          console.log('=========================focus')
        }
      }
    })
  }
})
// mount
app.$mount('.todoapp')

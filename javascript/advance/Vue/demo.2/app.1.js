
function log(name, background = '#222', color = '#bada55') {
    console.log(`%c[=======================>${name}]`, `background: ${background}; color: ${color}`)
}
// app Vue instance
var app = new Vue({
    // app initial state
    data: {
        msg: 0
    }
})
// mount
app.$mount('.todoapp')

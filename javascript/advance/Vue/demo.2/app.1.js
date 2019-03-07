
function log(name, background = '#222', color = '#bada55') {
    console.log(`%c[=======================>${name}]`, `background: ${background}; color: ${color}`)
}
// app Vue instance
var app = new Vue({
    // app initial state
    data: {
        msg: 0
    },
    watch: {
        msg: {
            handler: function (msg) {
                log(this.msg)
            }
        }
    },
    methods: {
        log: function (name, background = '#FFF', color = '#000') {
            log(name, background, color)
        }
    },
    mounted: function (...args) {
        log('mounted')
        this.msg = 1
        this.msg = 2
        this.msg = 3
    }
})
// mount
app.$mount('.todoapp')

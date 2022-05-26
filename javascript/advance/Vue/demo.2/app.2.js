
/**
 * https://juejin.im/post/5ae3f0956fb9a07ac90cf43e
 * nextTick
 */
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
        this.msg = 'end'
        log('1')
        setTimeout(() => { // macroTask
            log('3')
        }, 0)
        Promise.resolve().then(function () { //microTask
            log('promise!')
        })
        this.$nextTick(function () {
            log('2')
        })


    }
})
// mount
app.$mount('.todoapp')

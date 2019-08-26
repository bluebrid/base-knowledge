// import Vue from '../../../vue/dist/vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

// 1. Use plugin.
// This installs <router-view> and <router-link>,
// and injects $router and $route to all router-enabled child components
Vue.use(VueRouter)

// 2. Define route components
const Home = {
  template: '<div>Home</div>'
}

const Home1 = {
  template: '<div>Home1</div>'
}
const Foo = {
  data () {
    return { saved: false }
  },
  template: `
    <div>
      <p>baz ({{ saved ? 'saved' : 'not saved' }})</p>
      <button @click="saved = true">save</button>
    </div>
  `,
  beforeRouteEnter(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next();
  },
  beforeRouteLeave(to, from, next) {
    if (this.saved || window.confirm('Not saved, are you sure you want to navigate away?')) {
      next()
    } else {
      next(false)
    }
  }
}
const Bar = { 
  data () {
    return {
      prevId: 0
    }
  },
  template: '<div>bar</div>',
  beforeRouteUpdate (to, from, next) {
    this.prevId = from.params.id
    next()
  }
 }
const Unicode = { template: '<div>unicode</div>' }

// 3. Create the router
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'active-link',
  routes: [
    // { path: '/', component: Home },
    {
      path: '/',
      components: {
        default: Home,
        test: Home1
      }
    },
    {
      path: '/foo',
      component: Foo,
      beforeEnter (to, from, next) {
        console.log('Config beforeEnter', to, from)
        next()
      }
    },
    { path: '/bar', component: Bar },
    { path: '/é', component: Unicode }
  ]
})

router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  next()
})
/*
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve', to, from)
  next()
})

router.onReady((route) => {
  console.log('VueRoute Ready successfully')
}, (route) => {
  console.log('VueRoute Ready fail')
})
router.beforeRouteLeave((to, from, next) => {
  console.log('beforeRouteLeave', to, from)
  next()
})

router.afterEach((to, from) => {
  console.log('afterEach', to, from)
})
*/
// 4. Create and mount root instance.
// Make sure to inject the router.
// Route components will be rendered inside <router-view>.

new Vue({
  router,
  template: `
    <div id="app">
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/foo">/foo</router-link></li>
        <li><router-link to="/bar">/bar</router-link></li>
        <router-link tag="li" to="/bar" :event="['mousedown', 'touchstart']">
          <a>/bar</a>
        </router-link>
        <li><router-link to="/é">/é</router-link></li>
      </ul>
      <router-view class="view"></router-view>
    </div>
  `,
  beforeCreate: function (...args) {
    this.log('App beforeCreate')
  }
}).$mount('#app')

/*
new Vue({
  router,
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ],
    ifShowTitle: false,
    showTitle: false
  },
  template: `
    <div id="app">
    <h1 v-if="ifShowTitle">title</h1>
    <h2 v-show="showTitle">title 2</h2>
      <ul id="example-1">
        <li v-for="item in items">
          {{ item.message }}
        </li>
      </ul>
    </div>
  `,
  beforeCreate: function (...args) {
    this.log('App beforeCreate')
  }
}).$mount('#app')
*/
/*
new Vue({
  router,
  data: {
    age: 11
  },
  methods: {
    changeAge: function (el) {
      this.log(this.age)
    }
  },
  template: `<input v-model.trim.number="age" @change="changeAge" />`, // v-model, @model, :model
  beforeCreate: function (...args) {
    this.log('App beforeCreate')
  }
}).$mount('#app')
*/
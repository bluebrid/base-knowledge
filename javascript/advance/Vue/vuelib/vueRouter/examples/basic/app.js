import Vue from '../../../vue/dist/vue'
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
  template: '<div>foo</div>'

  // beforeRouteEnter(to, from, next) {
  //   console.log('beforeRouteEnter', to, from)
  //   next()
  // },
  // beforeRouteUpdate(to, from, next) {
  //   console.log('beforeRouteUpdate', to, from)
  //   next()
  // },
  // beforeRouteLeave(to, from, next) {
  //   console.log('beforeRouteLeave  ', to, from)
  //   next()
  // }
}
const Bar = { template: '<div>bar</div>' }
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
      beforeEnter(to, from, next) {
        // console.log('Config beforeEnter', to, from)
        next()
      }
    },
    { path: '/bar', component: Bar },
    { path: '/é', component: Unicode }
  ]
})
/*
router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  next()
})
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
// new Vue({
//   router,
//   template: `
//     <div id="app">
//       <h1>Basic</h1>
//       <ul>
//         <li><router-link to="/">/</router-link></li>
//         <li><router-link to="/foo">/foo</router-link></li>
//         <li><router-link to="/bar">/bar</router-link></li>
//         <router-link tag="li" to="/bar" :event="['mousedown', 'touchstart']">
//           <a>/bar</a>
//         </router-link>
//         <li><router-link to="/é">/é</router-link></li>
//       </ul>
//       <router-view class="view" name="test"></router-view>
//     </div>
//   `,
//   beforeCreate: function (...args) {
//     this.log('App beforeCreate')
//   }
// }).$mount('#app')

new Vue({
  router,
  template: `
    <div id="app">
      <h1>Basic</h1>
      <router-link to="/é">/é</router-link>
    </div>
  `,
  beforeCreate: function (...args) {
    this.log('App beforeCreate')
  }
}).$mount('#app')

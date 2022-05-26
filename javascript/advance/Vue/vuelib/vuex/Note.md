## use 方法
我们在使用`Vuex`的时候，我们一定要首先执行`Vue.use(Vuex)`后，`Vuex`才会工作。

首先我们从[官网](https://vue.docschina.org/v2/api/#Vue-use)查看其说明如下：
> 安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
当 install 方法被同一个插件多次调用，插件将只会被安装一次。

我们通过分析`use` 源码来分析来验证上面的说明：
```javascript
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    // 将Vue 追加到args 数组中
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
```
从上面的代码可知：
1. Vue将所有的plugin 保存在`Vue` 实例的`_installedPlugins`数组中
2. 每一个组件只会注册一次，是因为在上面的代码中， 有去判断`_installedPlugins` 数组中是否已经存在了
3. `plugin` 的写法有两种： 1， 是一个对象，但是必须提供`install` 方法，2, 就是一个方法.

下面我们我们来具体分析下`Vuex`的`install`代码来深入下`Vue` 插件的写法

## install
`Vuex`的`install`方法的源代码在`\src\store.js`中，代码如下：
```javascript
export function install (_Vue) {
  if (Vue && _Vue === Vue) {
    /**
     * 判断是否已经注册过Vuex插件
     */
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}
```
`install`方法主要是调用`applyMixin` ,其实主要也就是调用Vue 的`mixn`
` Vue.mixin({ beforeCreate: vuexInit })`

## mixin
`mixin` 方法是Vue的静态方法， 定义在`/vue/src/core/global-api/mixin.js`
```javascript
export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}
```
这个方法就是调用了`mergeOptions` 合并了参数，但是需要注意的是,<font color=red>这里的this 是Vue对象， 而不是Vue实例</font>

此时的`Vue.options` 是如下对象：
```javascript
{
beforeCreate: Array(1)
components: {}
directives: {}
filters: {}
_base: ƒ Vue(options)
}

```
多了一个`beforeCreae` 的属性， 而且是一个数组，就是我们用`mixin` 添加的。
另外几个属性是在`\vue\src\core\global-api\index.js`文件给Vue添加的静态属性。

## 实例化Vue

我们实例化Vue的代码如下：
```javascript
new Vue({
  store, // inject store to all children
  el: '#app',
  render: h => h(App)
})
```
跟没有使用`Vuex`的方式基本类似，但是我们传递了一个`store`的属性。

我们在new 一个Vue实例的时候， 会调用`Vue.prototype._init` 方法(`vue\src\core\instance\init.js`),
在这个方法里面会取合并我们new Vue传递的options 和Vue 上面挂载的静态属性到新创建的对象上：
```javascript
    if (options && options._isComponent) {
   
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor), // 将Vue上面挂载的静态属性之直接合并到Vue 实例上。
        options || {},
        vm
      )
    }
```
上面会跑`else` 分支.

同时在这个方法中， 会执行`Vue` 的第一个生命周期函数` callHook(vm, 'beforeCreate')`，
这个就会执行我们在` Vue.mixin({ beforeCreate: vuexInit })` 我们添加`Vuex`插件配置的`beforeCreate` 函数：
```javascript
  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
```
这个方法就是判断`options` 中是否存在`store`属性，如果存在，将其挂载在`Vue`实例的`$store` 属性上.

<font size=5 color=red>上面我们已经分析了mixin 挂载的属性是挂载在Vue上的静态属性，并且在实例化Vue对象的时候，
都会将Vue上的静态属性合并到Vue的实例上面, 所以在任何Vue的组件中，都是可以直接访问$store属性的，
这也就是使用了Vuex后，我们不需要层层传递属性给子组件，而是只要在自属性中直接访问this.$store</font>
```javascript
  methods: {
    ...mapActions([
      'toggleAll',
      'clearCompleted'
    ]),
    addTodo (e) {
      const text = e.target.value
      if (text.trim()) {
        this.$store.dispatch('addTodo', text)
      }
      e.target.value = ''
    }
  }
```
如上方法，我们就是直接通过`this.$store.dispatch('addTodo', text)` 

## dispatch 方法
dispatch 代码定义在`vuex\src\store.js`
```javascript
this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    }
```
```javascript
 dispatch (_type, _payload) {
    Vue.log({
      context: `1. 传入两个参数， 第一个是类型，如： sendMessage， 第二个参数是载荷，也就是需要修改的数据`,
      showLog: true
    })
    // check object-style dispatch
    /**
     * dispatch 可以使用如下两种方式：
     * 1. this.$store.dispatch('addTodo', text);
     * 2. this.$store.dispatch({type: 'addTodo, payload: text});
     */
    const {
      type,
      payload
    } = unifyObjectStyle(_type, _payload)

    const action = { type, payload }
    const entry = this._actions[type]
    if (!entry) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[vuex] unknown action type: ${type}`)
      }
      return
    }

    try {
      this._actionSubscribers
        .filter(sub => sub.before)
        .forEach(sub => sub.before(action, this.state))
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[vuex] error in before action subscribers: `)
        console.error(e)
      }
    }
    Vue.log({
      context: `action 都是返回一个Promise`,
      showLog: true
    })
    const result = entry.length > 1
      ? Promise.all(entry.map(handler => handler(payload)))
      : entry[0](payload)

    return result.then(res => {
      try {
        this._actionSubscribers
          .filter(sub => sub.after)
          .forEach(sub => sub.after(action, this.state))
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`[vuex] error in after action subscribers: `)
          console.error(e)
        }
      }
      return res
    })
  }
```
1. 首先组装一个`action`对象：
```javascript
  const {
      type,
      payload
    } = unifyObjectStyle(_type, _payload)

    const action = { type, payload }
```
分析`unifyObjectStyle` 可知道, 我们调用dispatch方法有两种形式：
> 1. `this.$store.dispatch('addTodo', text);`传入两个参数， 第一个是action 名称，第二个是我们需要操作的数据
> 2. `this.$store.dispatch({type: 'addTodo, payload: text});`传入一个对象，但是必须要有type 属性

2. 根据`action` 找到对应的`action` 方法` const entry = this._actions[type]`

我们在创建`Vuex.Store` 的对象时，传递了一个`actions`的属性：
```javascript
export default new Vuex.Store({
  state: {
    todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  actions,
  mutations,
  plugins
})
```
而actions 是如下一个对应的对象：
```javascript
export default {
  addTodo ({ commit }, text) {
    commit('addTodo', {
      text,
      done: false
    })
  },

  removeTodo ({ commit }, todo) {
    commit('removeTodo', todo)
  }
  ...
}

```
原则我们通过` const entry = this._actions[type]` 获取的entry 应该就是我们action 中配置的方法：
```javascript
 addTodo ({ commit }, text) {
    commit('addTodo', {
      text,
      done: false
    })
  },
```
但是其实不是，entry 对应的是:
```javascript
function wrappedActionHandler (payload, cb) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    if (store._devtoolHook) {
      return res.catch(err => {
        store._devtoolHook.emit('vuex:error', err)
        throw err
      })
    } else {
      return res
    }
  }
```
这个方法其实是在`registerAction` 封装的，我们现在来分析什么时候注册action的

## installModule
我们在实例化`Vuex.Store`对象的时候，首先创建了` this._modules = new ModuleCollection(options)`,
然后执行了`installModule(this, state, [], this._modules.root)`
在`installModule` 方法中执行了：
```javascript
module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  })
```
forEachAction 方法定义在`vuex\src\module\module.js`中：
```javascript
  forEachAction (fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn)
    }
  }
```
在上面的`foeEachValue` 会执行`module.forEachAction` 传递函数：
```javascript
(action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  }
```
而上面的action和key 就是我们在定义`action` 中的对象：
```javascript
export default {
  addTodo ({ commit }, text) {
    commit('addTodo', {
      text,
      done: false
    })
  },

  removeTodo ({ commit }, todo) {
    commit('removeTodo', todo)
  }
  ...
}

```
## registerAction
```javascript
function registerAction (store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = [])
  entry.push(function wrappedActionHandler (payload, cb) {
    let res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    if (store._devtoolHook) {
      return res.catch(err => {
        store._devtoolHook.emit('vuex:error', err)
        throw err
      })
    } else {
      return res
    }
  })
}
```
上面将对应的action 都返回了一个`Promise`.
1. 在上面执行`handler` 方法中， 传递了一个对象作为参数，在这个对象中有传递`store`，
所以我们其实可以直接在`action`中直接去变更(<font size=5 color=red>操作</font>)`store`,如：
```javascript
  addTodo ({ commit, state}, text) {
    state.todos.push({
      text,
      done: false
    })
  },
```
但是Vuex 是不提倡直接在`action` 中直接操作`store`, 如果我们在初始化`Vuex.Store`的是配置了严格模式:
```javascript
export default new Vuex.Store({
  state: {
    todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  actions,
  mutations,
  plugins,
  strict: true
})
```
在action 直接操作`store`是会报错的。
因为我们在初始化`Vuex.Store`的时候，在构造函数会执行`resetStoreVM`函数， 这个方法会取判断是否是严格模式：
```javascript
  if (store.strict) {
    enableStrictMode(store)
  }
```
```javascript
function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, () => {
    if (process.env.NODE_ENV !== 'production') {
      assert(store._committing, `do not mutate vuex store state outside mutation handlers.`)
    }
  }, { deep: true, sync: true })
}
```
这个方法注册了一个`$watch`,当state变更时，会取判断`store._commintting` 是否为`true`, 否则会报错。

而`store._committing` 这个属性，是在_withCommit：
```javascript
  _withCommit (fn) {
    const committing = this._committing
    this._committing = true
    fn()
    this._committing = committing
  }
```
而`_withCommit` 是` this.commit`调用的， 所以`Vuex`要求所有的state 的变更都是通过`commit` 来提交的.

2. action 的第二种写法是：
```javascript
  addTodo({ commit, state }, text) {
    commit('addTodo', {
      text,
      done: false
    });
  },
```
就是在action中通过`commit`来提交一个变更.

3. 我们上面有分析`action` 返回的是一个Promise, 所以我们Action 第三种写法是：
```javascript
 addTodo({ commit, state }, text) {
    return Promise.resolve({
      text,
      done: false
    }).then((data) => {
      commit('addTodo', data);
    });
  },
```

## commit 方法
上面我们已经分析了`action`，但是`action` 最终都是通过`commit` 来提交一个变更，所以我们下面来分析下`commit`方法：
```javascript
    this.commit = function boundCommit (type, payload, options) {
      return commit.call(store, type, payload, options)
    }
```
```javascript
  commit (_type, _payload, _options) {
    // check object-style commit
    const {
      type,
      payload,
      options
    } = unifyObjectStyle(_type, _payload, _options)

    const mutation = { type, payload }
    const entry = this._mutations[type]
    if (!entry) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(`[vuex] unknown mutation type: ${type}`)
      }
      return
    }
   
    this._withCommit(() => {
      entry.forEach(function commitIterator (handler) {
        handler(payload)
      })
    })
    /**
     * 执行完mutations后，去通知所有的订阅者
     * 1.logger.js 插件就是根据这个方法subscribe来实现的
     * 2.devtool.js 也是同样的原理
     */
    this._subscribers.forEach(sub => sub(mutation, this.state))

    if (
      process.env.NODE_ENV !== 'production' &&
      options && options.silent
    ) {
      console.warn(
        `[vuex] mutation type: ${type}. Silent option has been removed. ` +
        'Use the filter functionality in the vue-devtools'
      )
    }
  }
```
1. 上面`commit` 方法首先从`this._mutations[type]` 取出`entry`，我们可以看到`commit`其实对应的就是`mutations`的操作。
2. 然后调用`_withCommit`
3. `this._subscribers.forEach(sub => sub(mutation, this.state))` 通知state的订阅者.

我们现在已经知道了`commit`其实关联的是`mutations`，我们现在来分析怎么注册`mutations`的(跟注册action 方式一样，下面我们来具体分析)

## mutations

在初始化`Vuex.Store`执行了`installModule`方法，同样在这里注册了`mutations`:
```javascript
  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    // 如果是嵌套模块，而且设置了namespaced: true, 则namespacedType 的值是： cart/pushProductToCart
    registerMutation(store, namespacedType, mutation, local)
  })
```
```javascript
function registerMutation (store, type, handler, local) {
  const entry = store._mutations[type] || (store._mutations[type] = [])
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload)
  })
}
```
其实`registerMutation` 很简单，就是执行执行`mutation`中配置的`handler`,
传递了两个参数，第一个是当前的`state`, 第二个就是要变更的`payload`.
所以`mutation`配置如下, 所以`mutation` 就是直接去变更`state`(<font color=red>在mutations 的handler 中可以通过this 来访问store实例</font>)：
```javascript
export const mutations = {
  addTodo (state, todo) {
    state.todos.push(todo)
  },

  removeTodo (state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },

  editTodo (state, { todo, text = todo.text, done = todo.done }) {
    todo.text = text
    todo.done = done
  }
}
```

## plugins

上面我们已经分析了`action` 和`mutations`, 已经知道了`store`的变更的流程。
现在我们有个需求是，如果我们的`todos`变更了，我们需要将对应的数据保存在`localStorage`中(因为我们只是一个Demo,我们需要将对应的数据保存在本地)，
如果我们没有使用`vuex`，我们可以在执行对应的方法后，
手动的去执行保存数据。
我们用了`Vuex`后，我们可以在`mutations`中对应的方法去保存数据到`localStorage`,
但是所有涉及到`todos`变更的方法都需要去执行对应的逻辑，比较繁琐。

但是我们如果可以去监听`store.todos`的变更，然后去执行数据保存的操作呢,应该就会简单很多。

我们发现`Vuex.Store`对象返回了一个`subscribe`方法，我们将初始化`Vuex.Store`的代码修改如下：

```javascript
import Vue from '../../../../vue/dist/vue'
import Vuex from 'vuex'
import { mutations, STORAGE_KEY } from './mutations'
import actions from './actions'
import plugins from './plugins'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  actions,
  mutations,
  plugins,
  strict: true
});

store.subscribe((mutation, { todos }) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
});

export default store

```
### subscribe
其实`store.subscribe`方法就是传递了一个方法，表示`state`变更后需要操作的逻辑。
我们在执行`store.subscribe`就是将`handler`保存在`Vuex.Store`实例的`_subscribers`中：
```javascript
 subscribe (fn) {
    return genericSubscribe(fn, this._subscribers)
  }
```
```javascript
function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn)
  }
  return () => {
    const i = subs.indexOf(fn)
    if (i > -1) {
      subs.splice(i, 1)
    }
  }
}
```
我们在执行完`commit` 方法后会遍历执行`_subscribers` 

```javascript
    this._withCommit(() => {
      entry.forEach(function commitIterator (handler) {
        handler(payload)
      })
    })
    /**
     * 执行完mutations后，去通知所有的订阅者
     * 1.logger.js 插件就是根据这个方法subscribe来实现的
     * 2.devtool.js 也是同样的原理
     */
    this._subscribers.forEach(sub => sub(mutation, this.state))
```
其实`subscribe`方法基本就已经满足了我们的需求。

## plugins 的使用
其实`Vuex.Store`还有一个`plugin`的功能，我们可以在初始化`Vuex.Store`的时候，传递`plugins`的属性，去配置插件。
1. 首先`plugins`必须是一个数组：
```javascript
  const {
      plugins = [],
      strict = false
    } = options
```
2. 在实例化`Vuex.Store`时，会去应用插件
```javascript
  // apply plugins
    plugins.forEach(plugin => plugin(this))
```
其实我们发现plugin 就是一个简单的function, 传递了`Vuex.Store`的实例，
但是我们可以结合`subscribe`做一些功能扩展，所以我们可以我们修改代码如下：
```javascript
const localStoragePlugin = store => {
  store.subscribe((mutation, { todos }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  })
}
```
```javascript

export default new Vuex.Store({
  state: {
    todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  actions,
  mutations,
  plugins: [localStoragePlugin]
})
```
我们一般将`plugins`单独抽成一个独立的文件:plugins.js
```javascript
import { STORAGE_KEY } from './mutations'
import createLogger from '../../../src/plugins/logger'

const localStoragePlugin = store => {
  store.subscribe((mutation, { todos }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  })
}

export default process.env.NODE_ENV !== 'production'
  ? [createLogger(), localStoragePlugin]
  : [localStoragePlugin]

```
```javascript
import Vue from '../../../../vue/dist/vue'
import Vuex from 'vuex'
import { mutations, STORAGE_KEY } from './mutations'
import actions from './actions'
import plugins from './plugins'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  actions,
  mutations,
  plugins
})
```
`Vuex`内置了两个插件`devtool` 和`logger`, 具体代码路径在`vuex\src\plugins`

## getter
有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数,
如，我们需要计算还有多少个`todos`没有完成，我们可以利用`computed`属性：
```javascript
  computed: {
    todos () {
      return this.$store.state.todos
    },
    allChecked () {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos () {
      return filters[this.visibility](this.todos)
    },
    remaining () {
      return this.todos.filter(todo => !todo.done).length
    }
  },
```
但是发现`computed`有大量的计算方法，让一个组件异常的臃肿，我们可以利用Vuex的`getter`属性来维护这些计算逻辑，

### getter 使用方式
1. 先创建一个`getter.js`文件：
```javascript
export default {  
    remainTodos: state => {
        return state.todos.filter(todo => !todo.done).length;
    }
}
```
2. 在初始化`Vuex.Store` 的时候，配置`getters`属性：
```javascript

export default new Vuex.Store({
  state: {
    todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
  },
  actions,
  mutations,
  plugins,
  getters// 添加新的属性
})

```
3. 使用`getter`属性， 我们可以`this.$store.getters.remainTodos` 这样使用，修改的`computed`如下：
```javascript
  computed: {
    todos () {
      return this.$store.state.todos
    },
    allChecked () {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos () {
      return filters[this.visibility](this.todos)
    },
     remaining () {
      return this.$store.getters.remainTodos // 利用getter 获取数据
    }
  }
```
可以直接通过`this.$store.getters`访问`getters`.

### getter 实现
上面就是`getter`的使用方法，我们下面来分析下Vuex对getter的处理过程。

1. 首先我们在实例化`Vuex.Store`对象的时候，会调用`installModule`方法，
```javascript
  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })
```
上面方法的就去遍历`getters`, 然后调用`registerGetter` 方法去注册`getter`:
2. 注册getter 主要的代码如下:
```javascript
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  }
```
其中`rawGetter`就是我们在`getters`中定义的方法。
上面我们将`getter`对象上的所有的属性都挂载在`store._wrappedGetters` 上面。

但是我们上面的使用getter的方法是：`this.$store.getters`, 而不是`_wrappedGetters`

是因为我们在初始化`Vuex.Store`对象是，在执行完`installModule` 后，最好执行了`resetStoreVM`方法：
```javascript
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure enviroment.
    computed[key] = partial(fn, store)
    Vue.log({
      context: `对store 中的getters 的数据进行拦截， 指向的是对应的vm的key`,
      showLog: true
    })
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })
```
将`wrappedGetters` 上面的所有的属性，全部挂载在`store.getters`上面，所以我们可以通过`this.$store.getters` 去访问`getters`.

### mapGetters

我们上面已经分析了getter的使用方法和已经实现的基本原理。下面我们来分析一个Vuex的一个辅助函数`mapGetters`.
在上面我们知道`getter`的使用方式是在computed 中定义一个方法属性，然后在这个方法中调用`this.$store.getters`, 如下：
```javascript
  computed: {
     remaining () {
      return this.$store.getters.remainTodos // 利用getter 获取数据
    }
  }
```
但是如果我们在`computed` 中有很多方法，并且都引用了`getter`里面的方法，那`computed`里面还是有大量的代码，而且都是直接引用`getter`里面的方法。
Vuex 里面提供了一个辅助函数`mapGetters`, 使用方法如下：
```javascript
  computed: {  
    ...mapGetters([
      'remaining',
    ])
  },
```
我们下面来分析下`mapGetters`的实现。
`mapGetters`定义在`vuex\src\helpers.js`里， 
其代码如下：
```javascript
export const mapGetters = normalizeNamespace((namespace, getters) => {
  // mapGetters(['threads', 'currentThread', 'unreadCount']),
  const res = {}
  normalizeMap(getters).forEach(({ key, val }) => {
    // The namespace has been mutated by normalizeNamespace
    val = namespace + val
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error(`[vuex] unknown getter: ${val}`)
        return
      }
      return this.$store.getters[val]
    }
    // mark vuex getter for devtools
    res[key].vuex = true
  })
  return res
})
```
首先调用`normalizeNamespace`, 这个方法返回的就是一个方法，其代码如下：

```javascript
function normalizeNamespace (fn) {
  return (namespace, map) => {
    /**
     * 可以传递两个参数，如果第一参数是字符串，则是对应的命名空间
     */
    if (typeof namespace !== 'string') {
      map = namespace
      namespace = ''
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/'
    }
    return fn(namespace, map)
  }
}
```
所以`mapGetters` 指向的就是`normalizeNamespace` 返回的方法， 其接受两个参数`namespace` `map`,
如果第一个参数不是字符串，表示`namespace` 为空，
```javascript
 ...mapGetters([
      'remaining',
    ])
```
所以上面的使用方式，会走`if`分支， 也就是`namespace`为空，
然后会执行`fn`, `fn`也就是在执行`normalizeNamespace` 传递的参数：
```javascript
(namespace, getters) => {
  // mapGetters(['threads', 'currentThread', 'unreadCount']),
  const res = {}
  normalizeMap(getters).forEach(({ key, val }) => {
    // The namespace has been mutated by normalizeNamespace
    val = namespace + val
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
        console.error(`[vuex] unknown getter: ${val}`)
        return
      }
      return this.$store.getters[val]
    }
    // mark vuex getter for devtools
    res[key].vuex = true
  })
  return res
}
```
`normalizeMap`代码如下：
```javascript
function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(key => ({ key, val: key }))
    : Object.keys(map).map(key => ({ key, val: map[key] }))
}

```
就是将传入的`map`进行加工，在我们上面的使用案例：
```javascript
...mapGetters([
      'remaining',
    ])
```
会加工成一个数组对象：
```javascript
[{
  key: 'remaining',
  val: 'remaining'
}]
```
然后会去遍历这个数组对象， 返回一个`res`对象：
```javascrpt
{
  remaining: function mappedGetter(){
     return this.$store.getters['remaining']
  },
  
}
```
所以如果我们配置`computed` 属性如下，
```javascript
  computed: {   
    ...mapGetters([
      'remaining',
    ])
  },
```
等价于:
```javascript
  computed: {   
     remaining: function mappedGetter(){
     return this.$store.getters['remaining']
  }
  },
```
## mapActions
上面我们已经分析了`mapGetters`, 我们可以同理分析`mapActions`
`mapAction` 的使用方式如下：
```javascript
  methods: {
    ...mapActions([
      'toggleAll',
      'clearCompleted'
    ])
  },
```
`mapActon`的核心代码如下：

```javascript
({ key, val }) => {
    res[key] = function mappedAction (...args) {
      // get dispatch function from store
      let dispatch = this.$store.dispatch
      if (namespace) {         
        const module = getModuleByNamespace(this.$store, 'mapActions', namespace)
        if (!module) {
          return
        }
        dispatch = module.context.dispatch
      }
  
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    }
  })
  return res
```
1. 首先从store 中获取`dispatch` 方法
2. 从上面的return 代码可知道， `mapAction`有两种传递参数的方式: 传递数组， 或者一个对象
3. 返回的对象如下：
```javascript
{
  toggleAll: function mappedAction(...args) {
    let dispatch = this.$store.dispatch
    return dispatch.apply(this.$store, 'toggleAll')
  },
  clearCompleted: function mappedAction(...args) {
    let dispatch = this.$store.dispatch
    return dispatch.apply(this.$store, 'clearCompleted')
  }
}
```
所以如下代码：
```javascript
  methods: {
    ...mapActions([
      'toggleAll',
      'clearCompleted'
    ])
  },
```
等价于：
```javascript
  methods: {
   toggleAll: function mappedAction(...args) {
     let dispatch = this.$store.dispatch
    return dispatch.apply(this.$store, 'toggleAll')
    },
    clearCompleted: function mappedAction(...args) {
      let dispatch = this.$store.dispatch
      return dispatch.apply(this.$store, 'clearCompleted')
    }
  },
```
## mapMutations
`mapMutations` 跟`mapActon` 逻辑基本一样， 
只是`mapMutations` 返回的对象如下：
```javascript
{
  toggleAll: function mappedMutation(...args) {
    let commit = this.$store.commit
    return commit.apply(this.$store, 'toggleAll')
  },
  clearCompleted: function mappedMutation(...args) {
    let commit = this.$store.commit
    return commit.apply(this.$store, 'clearCompleted')
  }
}
```
## 模块化

在上面的分析中，一直有涉及到`namespace`,但是我们我们都跳过了，我们现在来分析`namespace`,其实也就是Vuex模块化的概念.

当我们的项目很大的时候， `state`以及`action`等都非常庞大的时候，我们不可能将其全部维护在一个文件中。

我们可以根据业务模块去维护不同的`state` 和`action`.

比如说我们系统涉及：购物车管理(carts), 商品管理(products).

1. 在`store` 文件夹下面创建一个文件夹`modules`
2. 在`modules`下面分别创建两个文件： `cart.js`和`products.js`
3. 然后在每个文件下面维护对应的`action`, `state`, `getters`, `mutations`
4. 然后导出一个如下对象，但是维护了`namespaced` 为`true`
```javascript
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
```
5. 创建`Vuex.Store`的实例代码如下：
```javascript
export default new Vuex.Store({
  modules: {
    cart,
    products
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
```
上面的添加了一个`modules`属性，并且是一个对象。

6. 针对有命名空间的使用：
```javascript
export default {
  computed: {
    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    }),
    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotalPrice'
    })
  },
  methods: {
    checkout (products) {
      this.$store.dispatch('cart/checkout', products)
    }
  }
}
```
7. 取state需要在添加模块名称,如去cart 模块下面的checkoutStatus, 需要用`state.cart.checkoutStatus` 
8. `map...`方法第一个参数是模块名称
9. 直接调用`dispatch`方法， 需要添加命名空间,如为`cart` 模块下面的`checkout` 的`action` , 使用方式是： `this.$store.dispatch('cart/checkout', products)`

上面omen已经分析了`namespace`的基本使用方式了。
下面我们来分析`namespace`的实现具体做了什么事情。

### 初始化`modules`
我们在初始化`Vuex.Store`的时候，传递了`modules`的属性。




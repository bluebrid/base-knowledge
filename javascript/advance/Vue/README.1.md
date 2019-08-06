# Vue 的整体架构

## 准备环境
1. 先从[Vue Git](https://github.com/vuejs/vue) clone 一份代码`git clone git@github.com:vuejs/vue.git`到本地
2. 切换到根目录`cd vue`
3. `npm i`
4. 阅读`package.json` 文件，在`scripts` 中配置了`dev` 的脚本`"dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev",`
5. 运行`npm run dev`
6. 就会在根目录`dist` 文件夹下面生成一个`vue.js`文件
7. 创建一个html文件，引用`vue.js`文件，我们就可以去编写`Vue`的实例了

## rollup 脚本编译
Vue是利用Rollup进行代码编译的，我们上面运行的脚本是`"dev": "rollup -w -c scripts/config.js --environment TARGET:web-full-dev"`,
知道运行的是`scripts/config.js`配置文件，而且传递了一个`target` 为`web-full-dev` 的值，
分析`scripts/config.js`文件，
发现项目的入口文件是`entry: resolve('web/entry-runtime-with-compiler.js'),`,
下面来正式开始进行`Vue` 源码分析.

## 初始化阶段

## 挂载阶段
### 挂载元素的方法
挂载有两种方法：
1. 在初始化的时候可以直接配置`el`属性，因为在`_init`(vue\src\core\instance\init.js)方法中，会判断是否有`el`属性,
如果存在则直接调用`$mount`方法
```javascript
if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
```
使用范例如：
```javascript
new Vue({
    // app initial state
    el: '.todoapp'
})
```
2. 在初始化的时候，没有配置`el`属性， 那我们需要手动调用`$mount` 方法，如：
```javascript
var app = new Vue({
    // app initial state
    data: {
        msg: 0
    }
})
// mount
app.$mount('.todoapp')
```
### $mount 方法
`$mount` 方法是在`vue\src\platforms\web\entry-runtime-with-compiler.js`文件下定义的。
这个方法主要做两件事：
1. 判断是否配置了`render` 方法， 如果配置了`render` 属性， 则直接调用`mount` 方法
2. 如果没有配置`render`方法， 则根据传入的**选择器**， 获取html文本，然后调用`compileToFunctions` 方法去生成一个`render` 函数，
并且挂载在`Vue` 实例上。`render`函数其实就是一个匿名函数， 用来`_c`包裹的函数,这个函数是定义在`vue\src\core\instance\render.js`文件中的`initRender` 方法中，
并且`_c` 方法其实指向的就是`vue\src\core\vdom\create-element.js`的`createElement`方法

### mount方法
mount 方法是定义在`vue\src\platforms\web\runtime\index.js`中的
```typescript
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}
```

### mountComponent 方法
这个方法是定义在`vue\src\core\instance\lifecycle.js`中的.
这个方法会调用<font size=5 color=red>beforeMount</font>和<font size=5 color=red>mounted</font>两个生命周期函数，
这个方法最主要的是生成了一个`Watcher` 对象，并且第二个参数` var expOrFn = updateComponent`
```javascript
   updateComponent = () => {     
      vm._update(vm._render(), hydrating)
    }
```
```javascript
  var expOrFn = updateComponent;
  new Watcher(vm, expOrFn, noop, {
    before () {
      if (vm._isMounted) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
```

我们知道我们在创建一个`Watcher` 对象时， 是会直接调用`this.get()`的，这个get 就是我们`expOrFn` 函数，也就是`updateComponent`.
而上面我们看到`updateComponent` 函数就执行了` vm._update(vm._render(), hydrating)`方法，
而`_render` 方法是在`vue\src\core\instance\render.js` 中定义的。

### render方法

`render`方法主要做了一件事情， 执行我们在`$mount` 中生成的`render`方法 生成`VNode`对象，也就是虚拟DOM,
` vnode = render.call(vm._renderProxy, vm.$createElement)`

### update 方法
在上面的`updateComponent` 方法中，执行了`vm._update(vm._render(), hydrating)` ,
`_render()` 负责生成了`VNode`, `_update`应该就是根据`VNode`去更新`Dom`,
`update` 方法定义在`vue\src\core\instance\lifecycle.js`中。
```typescript
  Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const restoreActiveInstance = setActiveInstance(vm)
    vm._vnode = vnode
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode)
    }
    restoreActiveInstance()
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  }
```
_update方法其实也就主要是调用`__patch__` 去渲染`VNode`,<font size=5 color=red>先取出老的Vnode 保存在prevVnode, 然后将最新生成的Vnode 保存在vm 的_vonode 上</font>,

如果`prevVnode` 不存在，也就是第一次渲染，则执行` vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)`,

如果存在，也就是去更新了，则执行` vm.$el = vm.__patch__(prevVnode, vnode)`,

其实两个脚本都是执行`__patch__`方法，只是参数不一样。

### __patch__方法

`__patch__`方法定义在`vue\src\platforms\web\runtime\index.js`,
`Vue.prototype.__patch__ = inBrowser ? patch : noop`,
而`patch` 定义在`vue\src\platforms\web\runtime\patch.js`中， 
`export const patch: Function = createPatchFunction({ nodeOps, modules })`,

所以其最终指向的是：
`import { createPatchFunction } from 'core/vdom/patch'`
```javascript
return function patch (oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }

    let isInitialPatch = false
    const insertedVnodeQueue = []

    if (isUndef(oldVnode)) { // 第一次渲染， oldVnode 是vm.$el， 所以也不会是undefined, 所以会进入else 分支
      // empty mount (likely as component), create new root element
      isInitialPatch = true
      createElm(vnode, insertedVnodeQueue)
    } else {
      const isRealElement = isDef(oldVnode.nodeType)
      if (!isRealElement && sameVnode(oldVnode, vnode)) { 
          // 这个分支是去patch Vnode, 然后去更新DOM
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
      } else {
          // 这个是第一渲染
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR)
            hydrating = true
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true)
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              )
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          // 第一次render 需要创建一个空的Vnode
          oldVnode = emptyNodeAt(oldVnode)
        }

        // replacing existing element
        const oldElm = oldVnode.elm
        const parentElm = nodeOps.parentNode(oldElm)

        // create new node
        
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps.nextSibling(oldElm)
        )

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          let ancestor = vnode.parent
          const patchable = isPatchable(vnode)
          while (ancestor) {
            for (let i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor)
            }
            ancestor.elm = vnode.elm
            if (patchable) {
              for (let i = 0; i < cbs.create.length; ++i) {
                cbs.create[i](emptyNode, ancestor)
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              const insert = ancestor.data.hook.insert
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (let i = 1; i < insert.fns.length; i++) {
                  insert.fns[i]()
                }
              }
            } else {
              registerRef(ancestor)
            }
            ancestor = ancestor.parent
          }
        }

        // destroy old node
        if (isDef(parentElm)) {
          removeVnodes(parentElm, [oldVnode], 0, 0)
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode)
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
    return vnode.elm
  }
```
这个方法分两种情况： **第一次渲染** 和 **更新元素**：

第一次渲染：
1. 第一次进行渲染， oldVnode 是vm.$el， 所以也不会是undefined, 所以会进入else 分支。
2. 第一次进行渲染， `const isRealElement = isDef(oldVnode.nodeType)` 是true, 所以也会进入else 分支
3. 第一次进行渲染， 会创建一个空的oldVnode(` oldVnode = emptyNodeAt(oldVnode)`)
4. 第一次进行渲染， 调用`createElm` 方法根据Vnode 创建新的Dom
5. 第一次进行渲染，`removeVnodes(parentElm, [oldVnode], 0, 0)` 会将老的Dom元素删除
更新元素：
更新元素就直接进入第二个分支： ` patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)` 运行patchVnode 方法。
后面会分析**更新阶段** 会具体分析`patchVnode` 方法。

### createElm 方法
在分析`patch` 方法中，我们已经分析在执行`patch` 方法时，调用`createElm`方法会根据`VNode` 渲染出一个新的Dom.
这个方法也是定义在`core/vdom/patch` 下面我们来分析这个方法:
1. 创建最顶级的元素： 
```javascript
  vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode)
```
其`nodeOps.createElement(tag, vnode)`, 就是执行原生js`document.createElement(tagName)`创建元素。
2. 调用`createChildren(vnode, children, insertedVnodeQueue)` 创建子元素
```javascript
  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children)
      }
      for (let i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i)
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)))
    }
  }
```
这个方法其实就是递归调用`createElm` 方法， 但是我们需要注意的是：<font color=red size=5>第四个参数设置为： null</font>
对应的是`createElm` 方法的`refElm`的值。

3. 执行` insert(parentElm, vnode.elm, refElm)` 插入根据Vnode生成的Dom
```javascript
function insert (parent, elm, ref) {
    if (isDef(parent)) {
        if (isDef(ref)) {
        if (nodeOps.parentNode(ref) === parent) {
            // 插入真实的元素到parent
            nodeOps.insertBefore(parent, elm, ref)
        }
        } else {
        nodeOps.appendChild(parent, elm)
        }
    }
    }
```
我们可以看到只有传入了第三个参数`ref` 才会真正将DOM插入到parent 上面，否则都是append到parent.
`createElm`的第三个参数就是`parentElm`， 我们在`createChildren`方法递归调用`createElm` 方法的时候传入的第三个参数`vnode.elm`，
而我们在第一次调用`createElm` 创建的elm 是： `  vnode.elm = vnode.ns? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode)`，
就是根据顶级的`tag` 生成的元素。
而且只有第一次调用`createElm` 方法时才会传入`refElm` 元素。
```javascript
function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  )
```
所以上面的`insert` 方法，只有第一次调用`createElm`方法执行`insert`方法才会将元素添加到html 中，
`createChildren`调用`createElm` 创建的元素都是`append` 到对应的内存DOM上，
最终通过递归调用，将根据Vnode生成的Dom 都`append`到第一次执行的`parentElm`上， 添加插入到refElm上面。

## Vue 事件机制
 `vue\src\core\vdom\patch.js` 执行`createElm` 方法执行`invokeCreateHooks` 方法是绑定事件的入口

## 更新阶段
同步:
input 事件 -> reactiveSetter -> dep.notify -> Watcher.update -> nextTik(flushSchedulerQueue) -> 
异步:
flushSchedulerQueue -> watcher.run -> get -> getter -> _update -> 
一般更新阶段都是通过事件触发的，执行事件,
比如`input` 事件：
```javascript
function ($event) {
    if ($event.target.composing) return;
    newTodo = $event.target.value
}
```
会给`newTodo`赋值，
然后会进入`reactiveSetter` 方法，然后通过`dep.notify()` 去通知所有的`Watcher`, 

我们在第一次渲染的时候，执行`mountComponent`(src\core\instance\lifecycle.js)的方法时候，创建的`Watcher`对象：
```javascript
  new Watcher(vm, expOrFn, noop, {
    before () {
      if (vm._isMounted) {
        callHook(vm, 'beforeUpdate')
      }
    }
  }, true /* isRenderWatcher */)
```
是在执行`render` 方法之前， 
所以这个`Watcher` 对象，基本会被所有的被监听的属性绑定，
所以上面的`input` 事件，也会触发重新渲染，也就是上面的`Watcher` 的`expOrFn`,也就是：
```javascript
  updateComponent = () => {
      vm.log(`更新 ${vm.constructor.name === 'Vue' ? '根组件' : `${vm.$options._componentTag} 组件`}`, '#C0FF3E')
      /**
       * _update 去创建组件
       */
      vm._update(vm._render(), hydrating)
    }
```

在更新阶段，同样也会进入到`patch` 方法，
不过会进入如下分支：
```javascript
if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        // 更新已经存在的vnode
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
      }
```
### patchVnode 方法
这个方法会根据vnode.text 是否为undefined 来分为两种情况。
我们现在分析其为undefined 的情况。
然后取出oldVnode 和新的vnode 的children， 分别是: `oldCh`, `ch`
我们现在只先分析两个都不为undefined 的情况，则会进入：
```javascript
    if (oldCh !== ch) {
        // 根据oldVNode 和Vnode 的children 是否一样来判断更新(也就是同一级别来判断) 
        updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
    }
```
我们可以看到是根据新的VNode 和老的VNode的同一级的Children 来进行判断是否需要更新。

### updateChildren 方法

```javascript
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      // 添加元素
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
      // 删除元素
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
    }
```

## render方法
我们在执行`Vue.prototype.$mount`(`src\platforms\web\entry-runtime-with-compiler.js`)方法时， 会执行：
```javascript
      const { render, staticRenderFns } = compileToFunctions(template, {
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
```

而`compileToFunctions`方法最终指向的是(`vue\src\compiler\index.js`)：
```javascript
export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  /**
   * baseCompile 函数
   * 1, parse 方法，将字符串转换成抽象结构树
   */
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  /**
   * 1. generate 将抽象结构树转换成函数
   */
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
```
这个方法返回了一个对象，最重要的就是根据`template`返回了`render`方法。
这个方法分成两个部分：
1. `parse` 方法，根据`template` 字符串转换成抽象结构树`ast`
2. 将`ast` 转换成一个`render` 函数。

### parse函数
下面我们来分析下parse函数(`\src\compiler\parser\index.js`)




## 卸载阶段








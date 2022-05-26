# VueRouter

## 准备环境

1. 启动Vue 代码监控

> cd d/private/bluebrid/base-knowledge/javascript/advance/Vue/vuelib/vue
> npm run dev ` 启动Vue, 能时时监听Vue源码变更

2. 启动VueRouter 代码监控

> cd d/private/bluebrid/base-knowledge/javascript/advance/Vue/vuelib/vueRouter
> npm run dev:dist

3. 启动VueRouter 示例

> cd d/private/bluebrid/base-knowledge/javascript/advance/Vue/vuelib/vueRouter
> npm run dev

我们在VueRouter 下面的Example 中， 找到base示例的index.js 文件中， 我们引入了我们在第一步编译生成的Vue的代码.
所以Vue 不是从node_modules中引入的。
我们导入的VueRouter 看似是从node_modules中引入，其实是VueRouter 的源码src下面的文件。
因我们在Example文件夹下面有一个webpack.config.js文件中配置了alias

```javascript
   alias: {
      'vue': path.join(__dirname, '../..', 'vue/dist/vue.js'),
      'vue-router': path.join(__dirname, '..', 'src')
    }
```

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
```

## [下一代前端开发利器——Vite（原理源码解析）](https://mp.weixin.qq.com/s/oroQSMSPxtSEfnjuxu2pew)
## 当前工程化痛点
1. Webpack 开发环境缓慢的服务启动
2. 缓慢的HRM热更新

1. Vite 是基于<font color="red" size=5>esbuild</font> 和 Rollup ，依靠浏览器自身的ESM编译功能， 实现极致开发体验的新一代构建工具
2. <font size=5 color="red">依赖：</font>开发中不会变动的部分（NPM包，UI组件库)，esbuild进行预构建
3. <font size=5 color="red">源码：</font>浏览器不能直接允许非JS代码（jsx,.css,vue等），vite 只在浏览请求相关源码的时候进行转换，提供ESM源码
```html
<script type="module" src="/src/main.tsx"></script>
```

## 开发环境
1. 利用浏览器原生的`ES Module`编译能力，省略费时的编译环节，直接给浏览器开发环境源码，`dev server`只提供轻量服务
2. 浏览器在执行`ESM`的`import`时，会向`dev server`发起该模块的`ajax`请求，服务器对源码做简单处理后返回给服务器
3. `Vite`中`HMR`是在原生`ESM`上执行。当编译一个文件时，Vite只需要精确的使已编辑的模块失活，使得无论应用大小如何，HMR使用能快速保持快速更新
4. 使用`esbuild`处理项目依赖， `esbuild`使用`go`编写，比一般`node.js`编写得编译器快几个数量级
  
## 生产环境
1. 集成Rollup打包生产环境代码，依赖其成熟稳定的生态与更简洁的插件机制。
2. <font color="red">为什么生产环境仍需要打包？</font>
> 1. 尽管ESM现在得到了广泛的支持，但是嵌套会导致额外的网络往返，即使再HTTP2.0，也会造成性能影响
> 2. 打包可以进行代码的tree-shaking, 懒加载chunk分割，获得更好的缓存
## 流程对比
1. `webpack`通过向将整个应用打包，再将打包后得代码提供给`dev server`,开发者才能进行开发
![](https://mmbiz.qpic.cn/mmbiz_png/cAd6ObKOzECBD01hrMNicN1UfH2FbqZ5ObkbgOeNu639NyhYPsckTibbZoonD9qWqcT1p0r1SXz0hJsQCwh6icEkg/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)
2. `Vite`是直接将源码交给浏览器，实现`dev server`秒开，浏览器需要相关得模块时，再向`dev server`发起请求，服务器进行简单处理后，再将改模块返回给浏览器，实现正在意义上得`按需加载`
![](https://mmbiz.qpic.cn/mmbiz_png/cAd6ObKOzECBD01hrMNicN1UfH2FbqZ5OzP8AJ4Xog0bFHSb7CKE8uibQVJ3FleaxYxGUhTPAsHYID06QoefRnOw/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## [ESBuild & SWC](https://mp.weixin.qq.com/s/uAR0TEjDzW2tnK4QPfw7qQ)
1. <font color="red" size=5>ESBuild:</font>基于Go语言开发的JavaScript Bundler, 由Figma前CTO Evan Wallace开发, 并且也被Vite用于开发环境的依赖解析和Transform.
2. <font color="red" size=5>SWC:</font>则是基于Rust的JavaScript Compiler(其生态中也包含打包工具spack), 目前为Next.JS/Parcel/Deno等前端圈知名项目使用.

## [Vite插件](https://mp.weixin.qq.com/s/3ioIcXYC-DCPA63E7TSa5Q)

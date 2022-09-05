export function AllPlugin() {
  const virtualModuleId = 'virtual:my-module'
  const resolvedVirtualModuleId = '\0' + virtualModuleId
  let config
  return {
    name: 'my-plugin', // 必须的，将会在 warning 和 error 中显示
    // 以下钩子在服务器启动时被调用：
    options(ops) {
      console.log('=======options')
      return ops
    },
    buildStart(options) {
      console.log('=======buildStart')
    },
    // 以下钩子会在每个传入模块请求时被调用：
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export const msg = "000000000:from virtual module"`
      }
    },
    // 以下钩子在服务器关闭时被调用：
    buildEnd(opt) {
      console.log('=======buildEnd')
    },
    closeBundle(opt) {
      console.log(`=======closeBundle`)
    },
    moduleParsed(opt) {
      console.log(`=======moduleParsed`)
    },
    // Vite 特有的
    config: (config, { mode, command }) => {
      console.log(`=======config`)
      return {
        resolve: {
          alias: {
            foo: 'bar'
          }
        }
      }
    },
    configResolved(resolvedConfig) {
      // 存储最终解析的配置
      config = resolvedConfig
    },
    // 在其他钩子中使用存储的配置
    transform(code, id) {
      if (config.command === 'serve') {
        // dev: 由开发服务器调用的插件
      } else {
        // build: 由 Rollup 调用的插件
      }
    },
    configureServer(server) {
      // 也可以将server 存储起来， 在其他的插件中使用
      server.middlewares.use(async (req, res, next) => {
        if (req.url.endsWith('.coffee')) {
          // const templateFilePath = path.join(process.cwd(), req.url);
          // const buffer = fs.readFileSync(templateFilePath)
          // const source = buffer.toString();
          // const result = coffeescript.compile(source, {
          //     ...{ sourceMap: true, bare: true },
          //     ...{ filename: this.resourcePath },
          // });
          // res.setHeader('Content-Type', 'text/javascript')
          // res.statusCode = 200
          // res.end(result.js)
          // return
        }
        next()
      })
    },
    // configureServer(server) {
    //   // 返回一个在内部中间件安装后
    //   // 被调用的后置钩子
    //   return () => {
    //     server.middlewares.use((req, res, next) => {
    //       // 自定义请求处理...
    //     })
    //   }
    // }
    transformIndexHtml: {
      enforce: 'pre',
      transform(html) {
        return html
        // return fileTypes.reduce((items, file) => {
        //   if (fs.existsSync(file)) {
        //     const style = {
        //       tag: 'link',
        //       attrs: { rel: 'stylesheet', href: file },
        //       injectTo: 'head'
        //     }
        //     items.push(style)
        //   }
        //   return items
        // }, [] as Array<any>)
      }
    },
    // HMR
    handleHotUpdate({ file, server }) {
      if (!file.endsWith('.coffee.js')) {
        console.log('reloading by:', file)
        server.ws.send({
          type: 'full-reload',
          path: '*'
        })
      }
    }
  }
}

"use strict";

const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware");
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware");
const ignoredFiles = require("react-dev-utils/ignoredFiles");
const config = require("./webpack.config.dev");
const paths = require("./paths");

const protocol = process.env.HTTPS === "true" ? "https" : "http";
const host = process.env.HOST || "0.0.0.0";

module.exports = function(proxy, allowedHost) {
  return {
    // WebpackDevServer 2.4.3 introduced a security fix that prevents remote
    // websites from potentially accessing local content through DNS rebinding:
    // https://github.com/webpack/webpack-dev-server/issues/887
    // https://medium.com/webpack/webpack-dev-server-middleware-security-issues-1489d950874a
    // However, it made several existing use cases such as development in cloud
    // environment or subdomains in development significantly more complicated:
    // https://github.com/facebookincubator/create-react-app/issues/2271
    // https://github.com/facebookincubator/create-react-app/issues/2233
    // While we're investigating better solutions, for now we will take a
    // compromise. Since our WDS configuration only serves files in the `public`
    // folder we won't consider accessing them a vulnerability. However, if you
    // use the `proxy` feature, it gets more dangerous because it can expose
    // remote code execution vulnerabilities in backends like Django and Rails.
    // So we will disable the host check normally, but enable it if you have
    // specified the `proxy` setting. Finally, we let you override it if you
    // really know what you're doing with a special environment variable.
    disableHostCheck:
      !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === "true",
    // Enable gzip compression of generated files.
    compress: true,
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: "info",
    // color: true,
    // By default WebpackDevServer serves physical files from current directory
    // in addition to all the virtual build products that it serves from memory.
    // This is confusing because those files won’t automatically be available in
    // production build folder unless we copy them. However, copying the whole
    // project directory is dangerous because we may expose sensitive files.
    // Instead, we establish a convention that only files in `public` directory
    // get served. Our build script will copy `public` into the `build` folder.
    // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
    // Note that we only recommend to use `public` folder as an escape hatch
    // for files like `favicon.ico`, `manifest.json`, and libraries that are
    // for some reason broken when imported through Webpack. If you just want to
    // use an image, put it in `src` and `import` it from JavaScript instead.
    contentBase: paths.appPublic,
    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true, // 监听contextbase文件夹下面的内容， 如果contextbase的内容变更了， 则直接刷新页面
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    // hot 是用来这是热更新的， 需要配合(热更新就是我们在不刷新页面的情况下， 页面相应的值也会进行更新，其实就是重新生成了一个新的文件，
    // 然后通过Ajax请求对应的新的脚本， 然后在页面执行这个脚本, 如果不支持热更新， 则直接通过：window.location.reload();重新加载页面，进行页面的更新)：
    // 1. 在webpack.config.js 中配置插件：new webpack.HotModuleReplacementPlugin(),
    // 2. 需要在devServer中设置hot:true
    // 3. 需要在应用的Index.js 中配置：
    /**
     * if (module.hot) {
      // -------------------3、热更新操作
        // HotModuleReplacement.runtime.js 中定义了accept
        module.hot.accept(undefined, () => { // accept 第一个参数表示为undefined 表示这个本身的页面也会热更新
          // require("./index.js");
          //  renderWithHotReload(Router);
        });
      }
     */
    // hotOnly: true,
    hot: true,
    // It is important to tell WebpackDevServer to use the same "root" path
    // as we specified in the config. In development, we always serve from /.
    publicPath: config.output.publicPath,
    // WebpackDevServer is noisy by default so we emit custom message instead
    // by listening to the compiler events with `compiler.plugin` calls above.
    quiet: true,
    // Reportedly, this avoids CPU overload on some systems.
    // https://github.com/facebookincubator/create-react-app/issues/293
    // src/node_modules is not ignored to support absolute imports
    // https://github.com/facebookincubator/create-react-app/issues/1065
    // const usePolling = this.watchOptions.poll ? true : undefined; // eslint-disable-line no-undefined
    // const interval = typeof this.watchOptions.poll === 'number' ? this.watchOptions.poll : undefined; // eslint-disable-line no-undefined
    // const options = {
    //   ignoreInitial: true,
    //   persistent: true,
    //   followSymlinks: false,
    //   depth: 0,
    //   atomic: false,
    //   alwaysStat: true,
    //   ignorePermissionErrors: true,
    //   ignored: this.watchOptions.ignored,
    //   usePolling,
    //   interval
    // };
    // const watcher = chokidar.watch(watchPath, options).on('change', () => {
    //   this.sockWrite(this.sockets, 'content-changed');
    // });
    watchOptions: { // 设置需要监听的配置， 
      ignored: ignoredFiles(paths.appSrc) // 表示需要忽略的文件， 像这里忽略的是appSrc, 是因为webpack 本身就监听了这个文件， 所以devServer 不需要监听
    },
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    https: protocol === "https",
    host: host,
    overlay: false,
    historyApiFallback: true, // 如果路由没有匹配到任何的资源，都指向index.html
    // historyApiFallback: {
    //   // Paths with dots should still use the history fallback.
    //   // See https://github.com/facebookincubator/create-react-app/issues/387.
    //   disableDotRule: true
    // },
    public: allowedHost,
    useLocalIp: true,
    // open: true,
    proxy,
    progress: true,
    // writeToDisk: true,
    before(app) {
      // This lets us open files from the runtime error overlay.
      app.use(errorOverlayMiddleware());
      // This service worker file is effectively a 'no-op' that will reset any
      // previous service worker registered for the same host:port combination.
      // We do this in development to avoid hitting the production cache if
      // it used the same host and port.
      // https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432
      app.use(noopServiceWorkerMiddleware());
      app.get('/users', (req, res) => {
        const users = [
          {
            name: 'ivan',
            age: 12
          },
          {
            name: 'tom',
            age: 18
          }
        ];
        setTimeout(() => {
          res.end(JSON.stringify(users));
        }, 1000 * 5);
      });
    },
    // setup(app) {
    //   console.log('============>setup')
    // },
    // after(app) {
    //   console.log('============>after')
    // }
  };
};

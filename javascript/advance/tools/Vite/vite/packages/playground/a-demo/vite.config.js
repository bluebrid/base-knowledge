const { resolve } = require('path')
const { AddErudaPlugin } = require('./scripts/addErudaPlugin')
const {AllPlugin} = require('./scripts/allPlugins')
const { AddStylesPlugin } = require('./scripts/addStylesPlugin')
const { AddScriptsPlugin } = require('./scripts/addScriptsPlugin')
const handlebars = require('./scripts/handlebarsPlugin')
import FullReload from 'vite-plugin-full-reload'
const { CustomHmrPlugin } = require('./scripts/customHmrPlugin')
const { PugTransformerPlugin } = require('./scripts/pugTransformerPlugin')
const { markdownTransformerPlugin } = require('./scripts/markdownTransformerPlugin')
const {CoffeescriptTransformerPlugin} = require('./scripts/coffeescriptTransformerPlugin')
import Inspect from 'vite-plugin-inspect'

module.exports = {
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      less: {
      },
      sass: {},
      styl: {
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      }
    }
  },
  plugins: [
    Inspect(),// __inspect
    AllPlugin(),
    PugTransformerPlugin(),
    markdownTransformerPlugin(),
    AddStylesPlugin,
    AddErudaPlugin,
    AddScriptsPlugin,
    CustomHmrPlugin,
    FullReload(['**/*.css', '**/*.less', '**/*.scss']),
    handlebars({
      partialDirectory: resolve(__dirname, ''),
    }),
    CoffeescriptTransformerPlugin(),
  ],
  server: {
    port: 8080,
    open: true,
    hmr: {
      overlay: false
    }
  },
  optimizeDeps: {
    exclude: ['dist/index.coffee.js']
  }
}

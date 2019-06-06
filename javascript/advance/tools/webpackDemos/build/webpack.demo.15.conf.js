const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
/**
 *  分析多页面的性能问题
 * 
 *  我们在one.js , two.js 中都添加一个loadsh 的库， 我们重新运行`npm run dev14`,
 *  发现所有的文件的hash 都变更了， 不仅如此，而且更加显著的是common 的提及明显变大，
 *  这就意味着loadsh 也被打包进入了common当中,
 *  但这本身是一个错误的行为， loadsh 和jquery 平时根本不会对其进行修改，
 *  所以我们需要当杜将loadsh 和jquery 单独打包出去, 所以我们在entry 入口的地方进行配置 commons: ['jquery', 'loadsh'] // 设置vendor 的入口,
 *  上面我们已经将jquery , loadsh 给打包到了common 中，现在我们在one.js 和two.js 中引用react 相关的库,
 *  我们发现react 也被打包进了common 中，但是我们只想永久缓存jquery 和loadsh,
 *  所以我们将splitChunks中的minChunks修改为：`minChunks:Infinity`,
 *  我们发现common 的体积恢复之前一样大小， 说明react 没有被打包到common, 
 */
module.exports = {
    // mode: 'development',
    mode: 'production',
    context: path.resolve(__dirname, '../'),
    entry: {
      one:  `./src/demo.15/one.js`,
      two: `./src/demo.15/two.js`,
      commons: ['jquery', 'loadsh'], // 设置vendor 的入口
      react: ['react', 'react-dom', 'react-loadable', 'react-router-dom']
    },
    // devtool: '#source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename:'[name].[chunkhash:8].js'       
    },
    optimization: {
      // runtimeChunk: "single", // 会生成runtime.fa73f3e4.js 文件
      // https://webpack.docschina.org/configuration/optimization/#src/components/Sidebar/Sidebar.jsx
      splitChunks: { // new webpack.optimize.CommonsChunkPlugin
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2
          },
          react: {
            name: 'react',
            chunks: 'initial',
            minChunks: 2
          }
        }
      }
    },
    plugins: [
      new CleanWebpackPlugin()
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'common'
      // })
    ]  
}


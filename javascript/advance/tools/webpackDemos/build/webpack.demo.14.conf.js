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
 *  所以我们需要当杜将loadsh 和jquery 单独打包出去, 所以我们在entry 入口的地方进行配置 commons: ['jquery', 'loadsh'] // 设置vendor 的入口
 */
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
      one:  `./src/demo.14/one.js`,
      two: `./src/demo.14/two.js`,
      commons: ['jquery', 'loadsh'] // 设置vendor 的入口
    },
    // devtool: '#source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename:'[name].[chunkhash:8].js'       
    },
    optimization: {
      // https://webpack.docschina.org/configuration/optimization/#src/components/Sidebar/Sidebar.jsx
      splitChunks: { // new webpack.optimize.CommonsChunkPlugin
        cacheGroups: {
          commons: {
            name: 'commons',
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


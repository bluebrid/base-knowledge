const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
/**
 *  分析多页面的性能问题
 *  为文件添加hash：  filename:'[name].[hash:6].js' 
 *  我们可以看到三个文件都有了hash ，但是此时每个文件的hash 都是一样的
 *  我们在运行`npm run dev12` 运行的结果一样，而且hash一样，
 *  但是如果我们改变任何一个文件的内容，所有的文件的hansh 都改变了，这样是不合理的
 */
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
      one:  `./src/demo.10/one.js`,
      two: `./src/demo.10/two.js`,
    },
    devtool: '#source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename:'[name].[hash:6].js'       
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


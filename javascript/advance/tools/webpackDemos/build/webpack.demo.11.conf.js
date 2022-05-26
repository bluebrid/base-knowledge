const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');
/**
 *  分析多页面的性能问题
 *  通过配置optimization splitChunks来抽离公共代码
 *   
 *  
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
        filename:'[name].js',
        //chunkFilename:'[name].js',// 设置按需加载后的chunk名字： chunkFilename的作用就是用来给拆分后的chunk们起名字的配置项
        // publicPath:'dist/' // 该配置能帮助你为项目中的所有资源指定一个基础路径。它被称为公共路径(publicPath)
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


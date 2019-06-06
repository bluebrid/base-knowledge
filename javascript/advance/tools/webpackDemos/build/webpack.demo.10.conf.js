const path = require('path')
const webpack = require('webpack')
/**
 *  分析多页面的性能问题
 *  在one.js 和two.js 都引入了jquery, 多页面打包的时候，两个文件都打包了jquery
 *  这样显然是不合理的 
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
    }    
}


const path = require('path')
const webpack = require('webpack')
/**
 * 集成webpack-dev-server,
 * 实现热更新， 需要配置hot, 而且添加两个插件，并且需要在入口文件添加 module.hot.accept()
 */
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: `./src/demo.4/a.js`,
    devtool: '#source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename:'[name].js',
        chunkFilename:'[name].js',// 设置按需加载后的chunk名字： chunkFilename的作用就是用来给拆分后的chunk们起名字的配置项
        publicPath:'dist/' // 该配置能帮助你为项目中的所有资源指定一个基础路径。它被称为公共路径(publicPath)
    },
    devServer: {
        contentBase: './',
        compress: true,
        port: 9000,
        hot: true,// 开始热更新
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}


const path = require('path')
const webpack = require('webpack')
/**
 * 集成React 和 ReactRouter
 * 1. 在rules中添加babel-loader
 * 2. 添加.babelrc 文件
 * 3. `npm install babel-loader @babel/core @babel/preset-env  @babel/preset-react @babel/plugin-syntax-dynamic-import --save-dev`
 * 4. `npm install react react-dom --save-dev`
 */
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: `./src/demo.5/app.js`,
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
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}


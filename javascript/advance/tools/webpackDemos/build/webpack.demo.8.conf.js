const path = require('path')
const webpack = require('webpack')
/**
 * 集成React 和 ReactRouter
 * 1. `npm install react-router-dom react-loadable --save-dev`
 *  
 */
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: `./src/demo.8/app.js`,
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
        // before: function(app) {
        //     app.get('*', (req, res) => {
        //         res.send(`<!DOCTYPE html>
        //         <html lang="en">
        //         <head>
        //           <meta charset="UTF-8">
        //           <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //           <meta http-equiv="X-UA-Compatible" content="ie=edge">
        //           <title>Document</title>
        //         </head>
        //         <body>
        //           <button id="btn">Button</button>
        //           <div id="app"></div>
        //           <script src="./dist/main.js"></script>
        //         </body>
        //         </html>
        //          `)
        //     })
        // }
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


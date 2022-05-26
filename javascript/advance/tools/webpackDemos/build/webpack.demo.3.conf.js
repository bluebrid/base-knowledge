const path = require('path')
/**
 * 添加动态引用，
 */
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: `./src/demo.3/a.js`,
    devtool: '#source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename:'[name].js',
        chunkFilename:'[name].js',// 设置按需加载后的chunk名字： chunkFilename的作用就是用来给拆分后的chunk们起名字的配置项
        publicPath:'dist/' // 该配置能帮助你为项目中的所有资源指定一个基础路径。它被称为公共路径(publicPath)
    }
}


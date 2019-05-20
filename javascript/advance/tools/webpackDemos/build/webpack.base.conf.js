const path = require('path')
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: `./src/demo.1/a.js`,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename:'[name].js',
        // chunkFilename:'[name].js',// 设置按需加载后的chunk名字
        // publicPath: '/'
    }
}


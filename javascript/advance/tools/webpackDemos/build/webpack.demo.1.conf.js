const path = require('path')
module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: `./src/demo.1/a.js`,
    devtool: '#source-map', // https://webpack.js.org/configuration/devtool/#production
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename:'[name].js'       
    }
}


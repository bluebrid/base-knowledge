const path = require('path')
const DonePlugin = require('./plugins/DonePlugin')
const OptimizePlugin = require('./plugins/OptimizePlugin')
const AsyncPlugin = require('./plugins/AsyncPlugin')
const FileListPlugin = require('./plugins/FileListPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlinePlugin = require('./plugins/InlinePlugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoExternalPlugin = require('./plugins/AutoExternalPlugin');
const MyPlugin = require('./plugins/MyPlugin')
const firstPlugin = require('./plugins/webpack-firstPlugin')
const CustomLogerPlugin = require('./plugins/BeforeRunPlugin')
const BannerPlugin = require('./lib/webpack').BannerPlugin;
const DefinePlugin = require('./lib/webpack').DefinePlugin;
module.exports = {
    entry: './src/index.js',
    mode: 'development',
    // mode: 'production',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    externals: {
        jquery: 'jQuery'
    },
    watch: true,
    plugins: [
        // new DonePlugin(),
        // new OptimizePlugin(),
        // new AsyncPlugin(),
        // new FileListPlugin()
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new MyPlugin(),
        new CustomLogerPlugin(),
        new firstPlugin(),
        // new InlinePlugin({
        //     test:/\.(js|css)$/
        // })
        // new AutoExternalPlugin({
        //     jquery: {
        //         varName: 'jQuery',
        //         url: 'https://cdn.bootcss.com/jquery/3.1.0/jquery.js'
        //     }
        // }),
     
        new DefinePlugin({
            PRODUCTION: JSON.stringify(process.env.NODE_ENV),
            VERSION: JSON.stringify('5fa3b9'),
            BROWSER_SUPPORTS_HTML5: true,
            TWO: '1+1',
            // 'typeof window': JSON.stringify('object'),
            // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
          }),
          new BannerPlugin({
            banner: "版权所有，翻版必究: hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]"
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: path.resolve('./loaders/loader.1.js'),
                        options: {
                            name: 'loader 1'
                        }
                    },
                    {
                        loader: path.resolve('./loaders/loader.2.js'),
                        options: {
                            name: 'loader 2'
                        }
                    }, {
                        loader: path.resolve('./loaders/drop-console.js'),
                    }]

            }
        ]
    },
    resolve: {
        alias: {
          'tapable': path.join(__dirname, './', 'lib/tapable')          
        }
      },
}
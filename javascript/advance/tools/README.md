1. webpack
2. babel
https://medium.com/@jsilvax/debugging-webpack-with-vs-code-b14694db4f8e
https://github.com/wallaceyuan/CodeBeautify
https://segmentfault.com/a/1190000013476837
Vscode debugger Webpack 源码方式
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debugger WebPack Launch Program",
            "program": "${workspaceFolder}/node_modules/webpack/bin/webpack.js",
            "args": [
                "--config", "${workspaceFolder}/webpack.config.js"
             ],
             "env" : { "NODE_ENV" : "development" }
        }
    ]
}

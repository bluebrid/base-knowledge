# CodeBeautify

[webpack原理](https://segmentfault.com/a/1190000015088834)
[https://webpack.wuhaolin.cn/](深入浅出 Webpack)
[带你深度解锁Webpack系列(优化篇)](https://juejin.im/post/5e6cfdc85188254913107c1f#heading-1)
[从基础到实战 手摸手带你掌握新版Webpack4.0详解 一起读文档](https://juejin.im/post/5cb36a3ef265da03a1581d6d#heading-11)

## 基本概念
1. entry: 入口，Webpack 执行构建的第一步将从entry 开始，可以看做是输入
2. module: 模块， 在webpack里， 一切皆为模块， 一个模块对应一个文件， webpack 会从配置的entry 开始递归查找出所有的依赖模块
3. chunk : 代码块， 一个chunk由多个模块组合而成， 用与代码的合并和分割
4. loader: 模块转换器， 用于把模块原来的内容按照需求转换成新的内容(AST)
5. plugin: 扩展插件， 在webpack 的构建流程中， 会在特定的时机广播对应的事件， 插件可以监听这些事件，然后在特定的时机做对应的事情

## 流程概括
webpack 构建流程是一个串行过程， 从启动到结束会经历如下过程：
1. 初始化参数： 从配置文件和shell 中获取配置的参数，并合并参数，得到最终的参数配置
2. 开始编译： 用上一步的获取到的配置参数初始化compiler对象， 加载所有配置的插件， 执行对象的run 方法开始编译
3. 确定入口： 根据配置参数中的entry 找出所有的入口文件
4. 编译模块： 从入口文件出发， 调用所有配置的loader 对模块进行翻译，再找出该模块中依赖的模块，在递归本步骤，直到所有的入口文件的依赖文件都经过loader 处理
5. 完成模块的编译： 在经过第四步使用loader 翻译完成所有的模块后， 得到了每个模块被翻译后的最终内容以及他们的依赖关系
6. 输出资源： 根据入口文件和模块之间的依赖关系， 组装成一个个包含多个模块的chunk， 在把chunk 转换成一个单独的文件，加入到输出列表， 这步是可以修改输出内容的最后机会
7. 输出完成： 在确定输出内容后， 根据配置的输出的路径和文件名，把文件写入文件系统

## 流程总结
1. 初始化： 启动构建，读取和合并配置参数， 加载pluin, 实例化compiler对象
2. 编译阶段： 从entry 出发， 针对每个module串行调用对应的loader去编译内容， 再找到该模块的依赖模块进行相同的loader处理， 递归的进行处理
3. 输出阶段：对编译后的module 组成了chunk, 把chunk 转换成文件，输出到文件系统

## [webpack 编译优化](https://juejin.im/post/5e6cfdc85188254913107c1f#heading-11)
1. 合理设置mode 模式，Webpack 4 在默认情况下mode的值是production, 会进行tree-shaking 和 uglifyJS
2. 利用alias去缩小文件的搜索范围
3. 合理利用include 和exclude
4. 合理利用noParse, 也就是说去配置哪些库不需要依赖其他的库，如jQuery 就不会依赖其他的库，noParse:/jquery/
5. 利用extension去配置查找的文件后缀，优先级高的放在前面，extension:['*', 'j.s', '.json', '.vue']
6. 利用happyPack 去开启多进程进行loader的转换
7. 利用webpack-parallel-uglify-plugin 增强代码的压缩速度
8. 利用Dllplugin 和DllReferencePlugin 去分离第三方代码
9. 配置loader缓存，因为我们每次构建执行的时候都会把所有的文件都重复编译一遍，这样的工作是可以缓存下来的，大部分loader都提供了cache的配置项babel-loader?cacheDirectory=true
10. 如果loader没有配置loader , 可以用第三方的loader-cache插件
11. 利用webpack-bundle-analyzer 进行分析打包后的文件
12. 利用externals来配置哪些文件不需要打包到bundle中，但是又可以在代码中用import 的方法导入库， externals: {jquery: 'jQuery'}, 在代码中同样可以用import $ from 'jquery' 来导入脚本。
13. 关于tree-shaking, 有个坑，要想让他生效，生成的代码必须是ES6的代码模块， 则需要在.babelrc 文件中配置， modules: false.

## babel & AST
[Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)
三个阶段：
1. 解析parse
> 接收代码并输出AST， 这个步骤分为：**词法解析**和**语法解析**
2. 转换transform
3. 生成generate
```javascript
module.exports = function ({ types: babelTypes }) {
    return {
        name: "deadly-simple-plugin-example",
        visitor: {
            Identifier: {
                enter(path, state) {
                    console.log("Entered!", path.node.name);
                },
                exit(path, state) {
                    console.log("Exited!");
                }
            },
            // Identifier(path, state) {
            //   if (path.node.name === 'bad') {
            //     path.node.name = 'good';
            //   }
            // },
            Literal(path, state) {
                path.node.value = false
            }
        }
    };
};
```
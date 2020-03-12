const path = require("path");
// https://juejin.im/post/5d1a3328e51d4510727c80e4

// 1. 绝对路径
console.log(__dirname) // 绝对路径：总是返回被执行的js文件所在的目录的绝对路径
console.log(__filename) // 绝对路径：总是返回被执行的js文件的绝对路径
console.log(process.cwd()) //绝对路径：总是返回运行node 命令时所在的文件夹的绝对路径
// process.cwd() 方法返回 Node.js 进程的当前工作目录
// ./： 不使用require时候，./与process.cwd()一样，使用require时候，与__dirname一样
/**
 * 传入的参数是字符串的路径片段，可以是一个，也可以是多个
   返回的是一个拼接好的路径，但是根据平台的不同，他会对路径进行不同的规范化，举个例子，Unix系统是/，Windows系统是\，那么你在两个系统下看到的返回结果就不一样。
   如果返回的路径字符串长度为零，那么他会返回一个.，代表当前的文件夹。
   如果传入的参数中有不是字符串的，那就直接会报错
 */
console.log(path.join('src', 'README.md'))
console.log(path.parse('/koala/Desktop/程序员成长指北/代码pra/node核心API.txt'))
/**
 * path.resolve就相当于是shell下面的cd操作，从左到右运行一遍cd path命令，
 * 最终获取的绝对路径/文件名，这个接口所返回的结果了。
 * 但是resolve操作和cd操作还是有区别的，resolve的路径可以没有，而且最后进入的可以是文件 
 * */
console.log(path.resolve(process.cwd(), "README.md"))
console.log(path.resolve('/foo/bar', '/bar/faa', '..', 'a/../c'));
/**
 * path.relative(from, to)
描述：从from路径，到to路径的相对路径。
边界：
如果from、to指向同个路径，那么，返回空字符串。
如果from、to中任一者为空，那么，返回当前工作路径。
 */
console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'));

console.log(path.relative('/data/demo', '/data/demo'));

console.log(path.relative('/data/demo', ''));

 
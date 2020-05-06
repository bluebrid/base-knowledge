[想学Node.js，stream先有必要搞清楚](https://juejin.im/post/5d25ce36f265da1ba84ab97a)

## stream 的弊端

1. 用`rs.pipe(ws)` 的方式来写入文件， 不是吧rs的内容`append`到文件中， 而是直接用rs的内容覆盖ws 原有的内容
2. 已经关闭技术的流是不能重新使用的，必须重新创建数据流
3. pipe 返回的是dest, 因此监听事件的时候，请注意你监听的对象是否正确
4. 
// 给你一把"螺丝刀"——recast
var recast = require("recast");

// 你的"机器"——一段代码
// 我们使用了很奇怪格式的代码，想测试是否能维持代码结构
var code =
  `
  function add(a, b) {
    return a +b
      // 有什么奇怪的东西混进来了
      // b,
  }
  `
// 用螺丝刀解析机器
var ast = recast.parse(code);

// ast可以处理很巨大的代码文件
// 但我们现在只需要代码块的第一个body，即add函数
var add  = ast.program.body[0]

console.log(add)
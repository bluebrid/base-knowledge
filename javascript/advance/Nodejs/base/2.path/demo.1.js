const path = require("path");
// process.cwd() 方法返回 Node.js 进程的当前工作目录
const filePath = path.resolve(process.cwd(), "README.md")
console.log(filePath)
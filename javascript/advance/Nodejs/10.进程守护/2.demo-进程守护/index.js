<<<<<<< HEAD
var spawn = require('child_process').spawn;
var process = require('process');

var p = spawn('node', ['b.js'], {
  detached: true // spawn 的第三个参数中， 可以设置detached属性，
  // 如果设置未true, 则会调用setsid 方法， 这样就满足了我们对守护进程要求
});
console.log(process.pid, p.pid);
=======
var spawn = require('child_process').spawn;
var process = require('process');

var p = spawn('node', ['b.js'], {
  detached: true // spawn 的第三个参数中， 可以设置detached属性，
  // 如果设置未true, 则会调用setsid 方法， 这样就满足了我们对守护进程要求
});
console.log(process.pid, p.pid);
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
process.exit(0);
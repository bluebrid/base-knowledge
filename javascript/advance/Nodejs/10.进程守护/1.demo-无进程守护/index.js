var spawn = require('child_process').spawn;
var process = require('process');

var p = spawn('node',['b.js']);
console.log(process.pid, p.pid);
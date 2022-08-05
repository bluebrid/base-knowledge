<<<<<<< HEAD
var spawn = require('child_process').spawn;
var process = require('process');

var p = spawn('node',['b.js']);
=======
var spawn = require('child_process').spawn;
var process = require('process');

var p = spawn('node',['b.js']);
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
console.log(process.pid, p.pid);
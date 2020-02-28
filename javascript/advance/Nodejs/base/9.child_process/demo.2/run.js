let process = require('child_process');
let fs = require('fs');
let ChildProcess = process.fork('./start.js');
ChildProcess.on('exit', function (code) {
    console.log('process exits + ' + code);
    fs.appendFileSync('./log.txt', '线程退出');
    if (code !== 0) {
        process.fork('./run.js');
    }
});
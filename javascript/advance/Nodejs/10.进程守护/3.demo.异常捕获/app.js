var express = require('express');
var graceful = require('./graceful');

var app = express()
    .use(function (req, res) {
        if (Math.random() > 0.5) {
            foo.bar();
        }
        setTimeout(function () {
            if (Math.random() > 0.5) {
                throw new Error('Asynchronous error from timeout');
            } else {
                res.end('Hello from Connect!');
            }
        }, 100);
        setTimeout(function () {
            if (Math.random() > 0.5) {
                throw new Error('Mock second error');
            }
        }, 200);
    })
    .use(function (err, req, res, next) {
        res.end(err.message);
    });
const PORT = 3000
var server = app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`)
});

graceful({
    servers: [server],
    killTimeout: '30s',
});
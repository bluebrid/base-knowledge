const http = require('http');
const PORT = 3000;
const server = http.createServer((req, res) => {
    if (req.url === '/error') {
        a.b; // 这个地方会报错， 然后进程就会奔溃
        res.end('error');
    } else {
        setTimeout(() => res.end('ok!'), 1000 * 10);
    }
});

server.listen(PORT, () => console.log(`port is listening on ${PORT}.`));
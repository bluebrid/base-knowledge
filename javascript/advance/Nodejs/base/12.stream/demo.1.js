// https://juejin.im/post/5d25ce36f265da1ba84ab97a
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer(function (req, res) {
    const fileName = path.resolve(__dirname, 'data.txt');
    fs.readFile(fileName, function (err, data) {
        res.end(data);
    });
});
server.listen(3000, () => {
    console.log(`server started at http://127.0.0.1:${3000}`);
});
 
// data URI 转文件
const fs = require('fs');
const mime = 'image/png';
const encoding = 'base64';
let base64Data = fs.readFileSync(`${__dirname}/monkey.png`).toString(encoding);
const uri = `data:${mime};${encoding},${base64Data}`;

base64Data = uri.split(',')[1];
const buf = Buffer(base64Data, 'base64');
fs.writeFileSync(`${__dirname}/secondmonkey.png`, buf);

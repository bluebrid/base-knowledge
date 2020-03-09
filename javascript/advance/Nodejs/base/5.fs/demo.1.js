const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'koalaFile.txt')
const filePath1 = path.join(__dirname, 'koalaFile1.txt')
// -- 异步读取文件
fs.readFile(filePath, 'utf8', function (err, data) {
    console.log(data);// 程序员成长指北
    fs.writeFile(filePath1, data, (err) => {
        if (err) console.log(err)
    });
    fs.appendFile(filePath1, '追加第四行内容', err => {
        err && console.log(err)
    })
});

// -- 同步读取文件
const fileResult = fs.readFileSync(filePath, 'utf8');
console.log(fileResult);// 程序员成长指北

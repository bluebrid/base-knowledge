
const fs = require('fs');
const path = require('path');
// 文件拷贝 将data.txt文件中的内容拷贝到copyData.txt
// 读取文件
const fileName1 = path.resolve(__dirname, 'koalaFile.txt')
fs.readFile(fileName1, function (err, data) {
    if (err) {
        // 出错
        console.log(err.message)
        return
    }
    // 得到文件内容
    var dataStr = data.toString()

    // 写入文件
    const fileName2 = path.resolve(__dirname, 'copyData.txt')
    fs.writeFile(fileName2, dataStr, function (err) {
        if (err) {
            // 出错
            console.log(err.message)
            return
        }
        console.log('拷贝成功')
    })
})

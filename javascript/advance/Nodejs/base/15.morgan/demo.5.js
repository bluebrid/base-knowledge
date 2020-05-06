var express = require('express');
var app = express();
var morgan = require('morgan');

// 带write方法的对象
var dbStream = {
  write: function(line){
    saveToDatabase(line);  // 伪代码，保存到数据库
  }
};

function saveToDatabase(line) {
    console.log(line)
}
// 将 dbStream 作为 stream 配置项的值
app.use(morgan('short', {stream: dbStream}));
app.use(function(req, res, next){
  res.send('ok');
});

app.listen(3000);
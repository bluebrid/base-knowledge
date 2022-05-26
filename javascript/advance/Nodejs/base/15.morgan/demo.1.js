var express = require('express');
var app = express();
var morgan = require('morgan');

app.use(morgan('dev'));
app.use(function(req, res, next){
    res.send('ok');
});

app.listen(3000);
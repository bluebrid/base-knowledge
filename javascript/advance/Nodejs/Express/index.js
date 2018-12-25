var express = require('./lib/express'); 
var path = require('path'); 

var app = module.exports = express(); 

// middleware
app.use(express.static(path.join(__dirname, 'public'), {
  etag: true
})) 

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}

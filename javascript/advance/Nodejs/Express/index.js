var express = require('./lib/express'); 
var path = require('path'); 

var app = module.exports = express(); 

// middleware
app.use(express.static(path.join(__dirname, 'public'), {
  etag: true,
  maxage: 1000,
  lastModified: true,  // Just being explicit about the default.
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      // 设置HTML 文件不缓存， 其他的默认的是no-cache
      res.setHeader('Cache-Control', 'no-store');
    }
  },
})) 

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}

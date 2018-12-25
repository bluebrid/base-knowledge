const express = require('./lib/express');

const app = module.exports = express();
app.set('config', {
  url: 'http://localhost:8080',
  userInfo: {
    name: 'ivan fan',
    age: 18
  }
})
app.get('/', (req, res) => {
  res.end('hello world')
})
app.get('/abc', (req, res) => {
  const config = app.get('config')
  console.log(config)
  res.end('hello world abc')
})
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}

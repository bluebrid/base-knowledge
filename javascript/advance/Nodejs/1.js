const Express = require('express')
const app = new Express();
const sleep = () => new Promise(resolve => setTimeout(function(){resolve(1)}, 2000))
const port = 3000

function f1(req, res, next) {
  console.log('f1 start ->');
  next();
  console.log('f1 end <-');
}

function f2(req, res, next) {
  console.log('f2 start ->');
  next();
  console.log('f2 end <-');
}

async function f3(req, res) {
  await sleep();
  console.log('f3 service...');
  res.send('Hello World!')
}

app.use(f1);
app.use(f2);
app.use(f3);
app.get('/', f3)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

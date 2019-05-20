var express = require('express')
var app = express()
app.use(express.static('dist'))


app.get('*', function (req, res) {
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    <div id="btn">btn</div>
    <script src="main.js"></script>
  </body>
  </html>`)
})
app.listen(5000);
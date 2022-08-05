<<<<<<< HEAD
var fs = require('fs');
var process = require('process');

fs.open("log.txt", 'w', function (err, fd) {
  if (err) {
    console.log(err)
    return;
  }
  console.log(fd);
  setInterval(() => {
    fs.write(fd, process.pid + "\n", function () { });
  }, 1000)
=======
var fs = require('fs');
var process = require('process');

fs.open("log.txt", 'w', function (err, fd) {
  if (err) {
    console.log(err)
    return;
  }
  console.log(fd);
  setInterval(() => {
    fs.write(fd, process.pid + "\n", function () { });
  }, 1000)
>>>>>>> 4f53eb28995bf2dc1a153acfe52032358032600d
});
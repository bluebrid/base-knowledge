const express = require('express')
const app = express()
const port = 3677;
/**
 * 1. Transfer-Encoding: chunked 
 * 2. 
 * @param {*} res 
 * @returns 
 */
const renderToStream = (res) => {
  return new Promise((resolve, reject) => {
    let count = 0;
    let timeId = setInterval(() => {
      if (count === 10) {
        res.write("<p>已经推送了" + count + "次</p>");
        clearInterval(timeId);
        resolve(); // 然后调用res.end()
        return;
      }
      res.write("<p>每1秒钟推送1次</p>");
      count++;
    }, 1000)
    })
}

app.get('/stream', (req, res) => {
  res.write("<!DOCTYPE html>");
  res.write("<head><meta charset='UTF-8'/><title>test stream</title></head>");
  res.write("<body></body>");
  renderToStream(res).then(() => {
    res.end();
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
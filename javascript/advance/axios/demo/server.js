const express = require("express");

const app =  new express();
app.get("/users", (req, res) => {
  const users = [
    {
      name: "ivan8080",
      age: 12
    },
    {
      name: "tom8080",
      age: 18
    }
  ];
  console.log('===================================users', new Date())
  setTimeout(() => {
    res.end(JSON.stringify(users));
  }, 1000)
  console.log('===================================users End', new Date())
});

app.listen(8080, () => {
    console.log('启动Express 服务')
})

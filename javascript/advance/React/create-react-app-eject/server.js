const express = require("express");

const app = new express();
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
  var body = "";
  req.on("data", function(thunk) {
    body += thunk;
  });

  req.on("end", function() {
    // console.log("post body is: " + body);
    // res.end("ok");
  });
  req.on("aborted", function() {
    console.log("2、客户端请求aborted");
  });

  req.on("close", function() {
    console.log("3、客户端请求close");
  });
  console.log("===================================users", new Date());
  // setTimeout(() => {
  //   res.end(JSON.stringify(users));
  // }, 1000 * 4);
  res.end(JSON.stringify(users));
  // console.log("===================================users End", new Date());
});

app.listen(8080, () => {
  console.log("启动Express 服务");
});

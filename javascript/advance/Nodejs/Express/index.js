var express = require("./lib/express");
var path = require("path");

var app = (module.exports = express());

// middleware
app.use(
  express.static(path.join(__dirname, "public"), {
    etag: true,
    maxage: 1000,
    lastModified: true, // Just being explicit about the default.
    setHeaders: (res, path) => {
      if (path.endsWith(".html")) {
        // 设置HTML 文件不缓存， 其他的默认的是no-cache
        res.setHeader("Cache-Control", "no-store");
      }
    }
  })
);

app.use("/a*{1}b", function customAMiddleware(req, res, next) {
  console.log(req.path);
  next();
});

app.set("config", {
  url: "http://localhost:8080",
  userInfo: {
    name: "ivan fan",
    age: 18
  }
});

app.get("/", (req, res) => {
  res.end("hello world");
});

app.get(
  "/a",
  (req, res, next) => {
    const config = app.get("config");
    console.log(config);
    res.end("==============>a");
    next();
  },
  (req, res) => {
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  }
);

app.get("/b", (req, res) => {
  // get 方法和路由get的get是同一个方法
  const config = app.get("config");
  console.log(config);
  // res.end(JSON.stringify(config))
  // json 最终还是用end 去发送结果
  res.json(config);
});

app.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE')
  next()
})

app.get('/user/:id', function (req, res, next) {
  console.log('although this matches')
  next()
})

app.get('/users/:id', function (req, res) {
  console.log('and this matches too')
  res.end()
})

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log("Express started on port 3000");
}

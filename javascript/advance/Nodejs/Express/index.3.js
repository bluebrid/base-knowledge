var express = require("./lib/express");
var app = express();
var router = express.Router();

var users = [
  {
    id: 1,
    name: "ivan"
  },
  {
    id: 2,
    name: "jack"
  },
  {
    id: 3,
    name: "tom"
  }
];
// customizing the behavior of router.param()
// router.param(function(param, option) {
//   return function(req, res, next, val) {
//     if (val === option) {
//       next();
//     } else {
//       res.sendStatus(403);
//     }
//   };
// });

// using the customized router.param()
// router.param("id", "1337");

router.param("userId", (req, res, next, userId) => {
  var user = users.find(user => user.id == userId);
  if (user) {
    req.user = user;
    next();
  } else {
    next(new Error("Failed to load user by id: " + userId));
  }
});

router.get("/getUser/:userId", function getUserByUserID(req, res){
  res.end(JSON.stringify(req.user));
});
// route to trigger the capture
router.get("/user/:id", function getUserByID(req, res) {
  res.send("OK");
});

app.use(router);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send(JSON.stringify({
      message: err.message,
      stack: err.stack
  }));
});

app.listen(3000, function() {
  console.log("Ready");
});


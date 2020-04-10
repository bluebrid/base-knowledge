const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.json());

app.post(
  "/comment",
  [
    body("email")
      .isEmail()
      .normalizeEmail(),
    body("text")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    body("notifyOnReply").toBoolean()
  ],
  (req, res) => {
    try {
        validationResult(req).throw();
        res.json({
            result: 'success'
        });  
    } catch(err) {
        res.status(422).json({
            result: 'fail',
            err
        })
    }
  }
);

app.listen(3000);

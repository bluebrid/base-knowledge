var express = require("express");
var log4js = require("log4js");
var app = express();

log4js.configure({
  appenders: { cheese: 
    { 
        type: "stdout", // 这里有不同的设置// https://github.com/log4js-node/log4js-node/blob/master/lib/appenders/index.js
        filename: "cheese.log" 
    } 
}, 
  categories: { default: { appenders: ["cheese"], level: "error" } }
});

var logger = log4js.getLogger("cheese");

logger.level = "ERROR"; // 级别 > INFO 的日志才会被打印

app.use(log4js.connectLogger(logger, {
    level: 'ERROR' // 这个跟上面直接设置level 效果一致
}));

app.use(function(req, res, next) {
  logger.trace("Entering cheese testing");
  logger.debug("Got cheese.");
  logger.info("Cheese is Comté.");
  logger.warn("Cheese is quite smelly.");
  logger.error("Cheese is too ripe!");
  logger.fatal("Cheese was breeding ground for listeria.");
  res.send("ok");
});

app.listen(3000);

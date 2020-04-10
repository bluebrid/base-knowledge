var express = require('express');
var expressJoi = require('./expressJoi');

var types = expressJoi.Joi.types; // The exposed Joi object used to create schemas and custom types

var app = express();
// app.use(express.methodOverride());
// app.use(express.bodyParser());
// app.use(app.router);
// app.use(errorHandler);

// Use the Joi object to create a few schemas for your routes. 
var getUsersSchema = {
  limit: types.Number().integer().min(1).max(25),
  offset: types.Number().integer().min(0).max(25),
  name: types.String().alphanum().min(2).max(25)
};

var updateUserSchema = {
  userId: types.String().alphanum().min(10).max(20),
  name: types.String().min(3).max(50)
};

// Attach the validator to the route definitions
app.get('/users', expressJoi.joiValidate(getUsersSchema), function returnFunc(req, res) {
    res.send(200, { hello: 'world' });
  });
app.put('/users/:userId', expressJoi.joiValidate(updateUserSchema), function returnFunc(req, res) {
    res.send(200, { hello: 'world' });
  });

app.listen(8080);
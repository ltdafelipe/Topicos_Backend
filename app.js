var express = require('express');
var path = require('path');
var cors = require('cors');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var todos = require('./routes/todos');
// inicia o express
var app = express();
app.use(cors());

// configura middlewares do express
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



app.use('/todos', todos);
// captura os erro 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// captura exceptions
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const error = {
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  }

  // render the error page
  res.status(err.status || 500);
  res.json(error);

  console.error(error);
});

module.exports = app;

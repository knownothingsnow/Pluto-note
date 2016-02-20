/**
 * 后端入口文件
 * @type {*|exports|module.exports}
 */
var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

//开发环境中使用webpack
var webpack = require('webpack');
var config  = require('./webpack.config.js');

var login = require('./routes/login');
var index = require('./routes/index');
var admin = require('./routes/admin');

var app      = express();
var compiler = webpack(config);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(cookieParser('Wilson'));

//设置服务器静态资源目录,可以设置多目录
app.use(express.static(path.join(__dirname, 'public')));

//调用webpack中间件打包
app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  // display no info to console (only warnings and errors)
  noInfo    : true,
  //stats详细配置含义:https://webpack.github.io/docs/node.js-api.html#stats-tojson
  stats     : {
    colors      : true,
    timings     : true,
    hash        : false,
    chunks      : false,
    chunkModules: false,
    modules     : false
  }
}));

//实现热加载
app.use(require('webpack-hot-middleware')(compiler));

app.use('/login', login);
app.use('/index', index);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err    = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error  : err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error  : {}
  });
});


module.exports = app;

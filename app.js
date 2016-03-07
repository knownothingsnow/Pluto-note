/**
 * 后端入口文件
 * @type {*|exports|module.exports}
 */
'use strict';
let express      = require('express');
let path         = require('path');
let favicon      = require('serve-favicon');
let logger       = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');
let session      = require('express-session');

//开发环境中使用webpack
let webpack = require('webpack');
let config  = require('./webpack.config.js');

let login = require('./routes/login');
let index = require('./routes/index');
let admin = require('./routes/admin');
let yanzheng = require('./routes/yanzheng');

let app      = express();
let compiler = webpack(config);

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

app.use(session({
  secret           : 'secret', //secret的值建议使用随机字符串
  resave           : true,
  saveUninitialized: false,
  cookie           : {maxAge: 60 * 1000 * 30} // 过期时间（毫秒）
}));

app.use('/', login);
app.use('/login', login);
app.use('/index', index);
app.use('/admin', admin);
app.use('/yanzheng', yanzheng);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err    = new Error('Not Found');
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

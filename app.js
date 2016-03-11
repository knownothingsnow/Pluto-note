'use strict';
/**
 * 后端入口文件
 * @type {*|exports|module.exports}
 * @author Knight Young
 */
let express      = require('express');
let path         = require('path');
let favicon      = require('serve-favicon');
let logger       = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');
let session      = require('express-session');
let consolidate  = require('consolidate');

let login = require('./server/routes/login');
let index = require('./server/routes/index');
let admin = require('./server/routes/admin');

let isDev = process.env.NODE_ENV !== 'production';
let app   = express();
let port  = 3000;

app.engine('html', consolidate.ejs);
app.set('view engine', 'html');
app.set('views', path.resolve('./server/views'));

// local variables for all views
app.locals.env    = process.env.NODE_ENV || 'dev';
app.locals.reload = true;

if (isDev) {

  // static assets served by webpack-dev-middleware & webpack-hot-middleware for development
  var webpack              = require('webpack'),
      webpackDevMiddleware = require('webpack-dev-middleware'),
      webpackHotMiddleware = require('webpack-hot-middleware'),
      webpackDevConfig     = require('./webpack.config.js');

  var compiler = webpack(webpackDevConfig);

  // attach to the compiler & the server
  app.use(webpackDevMiddleware(compiler, {

    // public path should be the same with webpack config
    publicPath: webpackDevConfig.output.publicPath,
    noInfo    : true,
    stats     : {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));

  app.use(express.static(path.join(__dirname, 'client')))
  app.use('/', login);
  app.use('/login', login);
  app.use('/index', index);
  app.use('/admin', admin);


  // add "reload" to express, see: https://www.npmjs.com/package/reload
  var reload = require('reload');
  var http   = require('http');

  var server = http.createServer(app);
  reload(server, app);

  server.listen(port, function () {
    console.log('App (dev) is now running on port 3000!');
  });
} else {

  // static assets served by express.static() for production
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/', login);
  app.use('/login', login);
  app.use('/index', index);
  app.use('/admin', admin);
  app.listen(port, function () {
    console.log('App (production) is now running on port 3000!');
  });
}

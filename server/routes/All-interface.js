'use strict';
/**
 * 路由控制器
 * @author Knight Young
 * @type {*|exports|module.exports}
 */
module.exports = function (app) {
  app.use('/', require('./login'))
  app.use('/login', require('./login'))
  app.use('/logout', require('./logout'))
  app.use('/index', require('./index'))
  app.use('/register', require('./register'))
}
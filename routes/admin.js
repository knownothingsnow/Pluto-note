'use strict';
/**
 * 登录路由逻辑
 * @type {*|exports|module.exports}
 * @author Knight Young
 */
let express = require('express');
let router = express.Router();


router.all('/', function(req, res) {
  res.render('admin')
});

module.exports = router;
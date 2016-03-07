/**
 * 登录路由逻辑
 * @author Knight Young
 * @type {*|exports|module.exports}
 */
'use strict';
var express = require('express');
var router = express.Router();


router.all('/', function(req, res) {
  res.render('admin')
});

module.exports = router;
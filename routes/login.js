/**
 * 登录路由逻辑
 * @author Knight Young
 * @type {*|exports|module.exports}
 */
'use strict';
let express = require('express');
let router  = express.Router();

router.all('/', function (req, res) {
  if (req.session.user) {
    res.render('index');

  } else {
    res.render('login');

  }
});

router.all('/login/submit', function (req, res) {
  //todo 此处数据应该从数据库中取得
  let userId   = req.body.userId,
      passWord = req.body.passWord;

  let admin = {
    userId  : 'ad',
    passWord: 'ad'
  };

  let user = {
    userId  : '1',
    passWord: '1'
  };

  if (userId == admin.userId && passWord == admin.passWord) {
    console.log('this is admin');
    req.session.user = userId;
    res.redirect('/admin');

  }
  else if (userId === user.userId && passWord === user.passWord) {
    console.log('this is user');
    req.session.user = userId;
    res.redirect('/index');

  } else {
    req.session.error = '用户名和密码不正确或不存在';
    res.redirect('/');

  }
});

module.exports = router;

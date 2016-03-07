/**
 * 登录路由逻辑
 * @author Knight Young
 * @type {*|exports|module.exports}
 */
'use strict';
let express = require('express');
let router  = express.Router();

router.post('/', function (req, res) {
  //todo 此处数据应该从数据库中取得
  let admin = {
    userId: 'a',
    passWord: 'a'
  };

  let user = {
    userId: '1',
    passWord: '1'
  };

  if (req.body.userId === admin.userId && req.body.passWord === admin.password) {
    console.log('this is admin');
    req.session.user = req.body.userId;
    res.redirect('admin');
  } else if (req.body.userId === user.userId && req.body.passWord === user.password) {
    console.log('this is user');
    req.session.user = req.body.userId;
    res.redirect('index');
  } else {
    req.session.error = "用户名或密码不正确";
    //res.send(req.session.error);
    res.render("login");
  }
});

module.exports = router;
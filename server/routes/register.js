'use strict'
/**
 * 用户注册接口
 * @author Knight Young
 * @type {*|exports|module.exports}
 */

let express    = require('express'),
    router     = express.Router(),
    register   = require('../modules/loginPage/register'),
    inputCheck = require('../modules/loginPage/inputCheck')

router.all('/', function (req, res) {
  inputCheck(req.body, function (results) {
    if (results) {//用户名存在
      res.render('jump', {msg: '该用户名已经被注册过,换个名字试试.'})
    } else {
      register(req.body, function (results) {
        if (results) {
          //todo session登录逻辑应该抽象
          req.session.userName = req.body.newName
          req.session.userId=results.insertId
          res.render('jump', {msg: '注册成功'})
        }
      })
    }
  })
})

module.exports = router
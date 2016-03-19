'use strict'
/**
 * 登录路由逻辑
 * @author Knight Young
 * @type {*|exports|module.exports}
 */
let express    = require('express')
let router     = express.Router()
let inputCheck = require('../modules/loginPage/inputCheck')

router.all('/', function (req, res) {
  res.render('indexPage/index')
  //if (req.session.userId) {
  //  res.render('indexPage/index')
  //} else {
  //  res.render('loginPage/login')
  //}
})

router.post('/login/submit', function (req, res) {
//todo 在视图加上表单验证
  //hack 此处对admin进行了特殊处理,正常情况应该有admin表
  if (req.body.userId === 'ad' && req.body.userPassWord === 'ad') {
    req.session.userId = req.body.userId
    res.redirect('/admin')
  } else {
    inputCheck.checkUser(req.body, function (results) {
      if (results) {
        //todo session登录逻辑应该抽象
        req.session.userId = req.body.userId
        res.redirect('/index')
      } else {
        res.render('jump',{msg:'用户名和密码不正确或不存在'})
      }
    })
  }
})

module.exports = router

'use strict'
/**
 * 登录路由逻辑
 * @author Knight Young
 * @type {*|exports|module.exports}
 */
let express    = require('express')
let router     = express.Router()
let inputCheck = require('../modules/loginPage/inputCheck')
let con        = require('../modules/connectDB.js')

router.get('/', function(req, res) {

  if(req.session.userId) {

    res.redirect('/index')

  } else {

    res.render('loginPage/login')

  }

})

router.post('/login/submit', function(req, res) {
  //todo 在视图加上表单验证
  //hack 此处对admin进行了特殊处理,正常情况应该有admin表
  if(req.body.userName === 'ad' && req.body.userPassWord === 'ad') {

    req.session.userName = req.body.userName

    res.redirect('/admin')

  } else {
    
    // inputCheck(req.body, function (results) {
    //   if (results) {
    //
    //     //todo session登录逻辑应该抽象
    //     req.session.userId   = results[0].userId
    //     req.session.userName = results[0].userName
    //
    //     res.redirect('/index')
    //
    //   } else {
    //
    //     res.render('jump', {msg: '用户名和密码不正确或不存在'})
    //
    //   }
    // })

    let sql = `SELECT userId,userName, passWord FROM user WHERE userName="${req.body.userName || req.body.newName}" and passWord="${req.body.userPassWord || req.body.newPassWord}"`

    con.query(sql).then(function(results) {
      if(results) {

        //todo session登录逻辑应该抽象
        req.session.userId   = results[0].userId
        req.session.userName = results[0].userName

        res.redirect('/index')

      } else {

        res.render('jump', {msg: '用户名和密码不正确或不存在'})

      }
    }).catch(function(error) {
      throw error
    })

  }
})

module.exports = router

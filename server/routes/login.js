'use strict'
/**
 * 登录路由逻辑
 * @author Knight Young
 * @type {*|exports|module.exports}
 */
let express = require('express'),
    login   = require('../modules/loginPage/main'),
    con     = require('../modules/connectDB.js'),
    router  = express.Router()

router.get('/', function(req, res) {

  req.session.userId ? res.redirect('/index') : res.render('loginPage/login')

})

router.post('/login/submit', function(req, res) {

  con.query(login.inputCheck(req.body)).then(function(results) {

    if(results.length===1) {

      req.session.userId   = results[0].userId
      req.session.userName = results[0].userName

      res.redirect('/index')

    } else { res.render('jump', {msg: '用户名和密码不正确或不存在'}) }

  }).catch(function(error) { throw error })

})

module.exports = router
